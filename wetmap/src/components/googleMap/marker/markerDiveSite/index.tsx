import React, { useContext } from 'react';
import { Marker } from '@react-google-maps/api';
import icon from '../../../../images/mapIcons/AnchorBlue1.png';
import { ModalContext } from '../../../reusables/modal/context';
import DiveSite from '../../../newModals/diveSite';

type MarkerDiveSiteProps = {
  id:       number
  title:    string
  position: google.maps.LatLngLiteral
};

export function MarkerDiveSite(props: MarkerDiveSiteProps) {
  const { modalShow } = useContext(ModalContext);

  return (
    <Marker
      icon={icon}
      title={props.title}
      position={props.position}
      onClick={() => {
        modalShow(DiveSite, {
          id:   props.id,
          size: 'large',
        });
      }}
    >
    </Marker>
  );
}
