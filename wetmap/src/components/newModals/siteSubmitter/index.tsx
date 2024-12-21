import React, { useEffect } from 'react';
import SiteSubmitterView from './view';
import { useContext } from 'react';
import '../../modals/confirmationModal.css';
import '../../modals/siteSubmitter.css';
import { insertDiveSiteWaits } from '../../../supabaseCalls/diveSiteWaitSupabaseCalls';
import { DiveSpotContext } from '../../contexts/diveSpotContext';
import { MapConfigContext } from '../../contexts/mapConfigContext';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { Form } from './form';
import { ModalContext } from '../../reusables/modal/context';
import { ModalHandleProps } from '../../reusables/modal/types';

type SiteSubmitterProps = Partial<ModalHandleProps>;

export default function SiteSubmitter(props: SiteSubmitterProps) {
  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);
  const { profile } = useContext(UserProfileContext);

  const { setMapConfig } = useContext(MapConfigContext);

  const { modalPause } = useContext(ModalContext);


  useEffect(() => {
    setAddSiteVals({
      ...addSiteVals,
      UserID:   profile?.UserID,
      UserName: profile?.UserName,
    });
  },[])

  const getDeviceLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setAddSiteVals({
            ...addSiteVals,
            Latitude:  position.coords.latitude,
            Longitude: position.coords.longitude,
          });
        },
        function (error) {
          console.log('location permissions denied', error.message);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 },
      );
    } else {
      console.log('unsupported');
    }
  };

  const onNavigate = () => {
    setMapConfig(1);
    modalPause();
  };

  const onSubmit = (data: Form) => {
    insertDiveSiteWaits({
      Site:      data.Site,
      Latitude:  data.Latitude,
      Longitude: data.Longitude,
      UserID:    profile && profile.UserID,
    });
    onClose();
  };

  const onClose = () => {
    setAddSiteVals({ ...addSiteVals, Site: '', Latitude: undefined, Longitude: undefined });
    props?.onModalCancel?.();
  };

  return (
    <SiteSubmitterView
      getDeviceLocation={getDeviceLocation}
      onNavigate={onNavigate}
      onClose={onClose}
      onSubmit={onSubmit}
      values={{
        Latitude:  addSiteVals?.Latitude,
        Longitude: addSiteVals?.Longitude,
      }}
    />
  );
}
