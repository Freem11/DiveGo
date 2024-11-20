import React from 'react';
import {
  GoogleMap,
  Marker,
  HeatmapLayer,
} from '@react-google-maps/api';
import style from './style.module.scss';
import { Cluster, HeatPoint, HeatPointConfiguration, MapConfiguration } from './types';
import useSupercluster from 'use-supercluster';
import anchorClusterIcon from '../../images/mapIcons/AnchorCluster.png';
import anchorIconGold from '../../images/mapIcons/AnchorGold.png';
import mantaIcon from '../../images/Manta32.png';
import {
  useState,
  useContext,
  useEffect,
} from 'react';

import { MasterContext } from '../contexts/masterContext';
import { MinorContext } from '../contexts/minorContext';
import { PinSpotContext } from '../contexts/pinSpotContext';

import { DiveSpotContext } from '../contexts/diveSpotContext';
import { ShopModalContext } from '../contexts/shopModalContext';
import { SitesArrayContext } from '../contexts/sitesArrayContext';
import { ZoomHelperContext } from '../contexts/zoomHelperContext';
import { CarrouselTilesContext } from '../contexts/carrouselTilesContext';
import { setupClusters, setupShopClusters, setupPinConfigs } from './mapPinHelpers';
import { ModalContext } from '../contexts/modalContext';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import { DiveShop } from '../../entities/diveShop';


type MapViewProps = {
  mapRef:                google.maps.Map | null
  mapConfigs:            MapConfiguration
  heatpointConfigs:      HeatPointConfiguration
  zoom:                  number
  center:                { lat: number, lng: number }
  tempMarker:            { lat: number, lng: number } | null
  animalVal:             string[]
  divesTog:              boolean
  newSites:              DiveSiteWithUserName[]
  newShops:              DiveShop[]
  heatpts:               HeatPoint[]
  boundaries:            google.maps.LatLngBounds
  mapCoords:             number[]
  setMapCoords:          (coords: number[]) => void
  mapZoom:               number
  selectedDiveSite:      DiveSiteWithUserName
  setSelectedDiveSite:   (site: DiveSiteWithUserName) => void
  setSelectedShop:       (shop: DiveShop) => void
  setMapZoom:            (zoomLev: number) => void
  onLoad:                (map: google.maps.Map) => void
  handleMapUpdates:      () => void
  handleBoundsChange:    () => void
  handleMapCenterChange: () => void
  handleMapZoomChange:   () => void
};

export default function MapView(props: MapViewProps) {
  const [pinRef, setPinRef] = useState<google.maps.Marker | null>(null);

  const { dragPin, setDragPin } = useContext(PinSpotContext);

  const { masterSwitch } = useContext(MasterContext);
  const { minorSwitch, setMinorSwitch } = useContext(MinorContext);

  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);

  const { zoomHelper, setZoomHelper } = useContext(ZoomHelperContext);

  const { shopModal } = useContext(ShopModalContext);

  const { setTiles } = useContext(CarrouselTilesContext);

  const { sitesArray } = useContext(SitesArrayContext);

  const { modalShow } = useContext(ModalContext);


  useEffect(() => {
    setDragPin({ lat: props.mapCoords[0], lng: props.mapCoords[1] });
  }, [masterSwitch]);


  useEffect(() => {
    if (zoomHelper) {
      if (shopModal) {
        props.setMapZoom(16);
        setMinorSwitch(true);
      } else if (!shopModal) {
        props.setMapZoom(12);
        setMinorSwitch(false);
      }
      setZoomHelper(false);
    }

    if (props.mapRef) {
      props.mapRef.panTo({ lat: props.mapCoords[0], lng: props.mapCoords[1] });
    }

    props.handleMapUpdates();
  }, [props.mapCoords, props.divesTog, props.animalVal]);

  const shopPoints: Cluster[]  = setupShopClusters(props.newShops);
  const sitePoints: Cluster[]  = setupClusters(props.newSites, sitesArray);
  const points: Cluster[] = [...sitePoints, ...shopPoints];

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds:  props.boundaries,
    zoom:    props.mapZoom,
    options: { radius: 75, maxZoom: 16 },
  });

  const handlePinLoad = (marker: google.maps.Marker) => {
    setPinRef(marker);
  };

  const handleDragEnd = () => {
    if (pinRef) {
      const position = pinRef;
      if (position instanceof google.maps.LatLng) {
        setAddSiteVals({
          ...addSiteVals,
          Latitude:  position.lat(),
          Longitude: position.lng(),
        });
      }
    }
  };

  const cleanupModals = () => {
    setTiles(true);
  };

  return (
    <GoogleMap
      zoom={props.zoom}
      center={props.center}
      mapContainerClassName={style.mapContainer}
      options={props.mapConfigs}
      onLoad={props.onLoad}
      onCenterChanged={props.handleMapCenterChange}
      onZoomChanged={props.handleMapZoomChange}
      onBoundsChanged={props.handleBoundsChange}
      onClick={cleanupModals}
    >

      {clusters
      && clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount }
            = cluster.properties;
        const { iconType, modalSetup }
            = setupPinConfigs(
              cluster.properties,
              cluster.geometry.coordinates,
              modalShow,
              props.selectedDiveSite,
              props.setSelectedDiveSite,
              props.setSelectedShop);

        if (isCluster) {
          return (
            <Marker
              key={cluster.id}
              position={{ lat: latitude, lng: longitude }}
              title={pointCount.toString() + ' locations'}
              icon={anchorClusterIcon}
              onClick={() => {
                const expansionZoom = Math.min(
                  supercluster.getClusterExpansionZoom(cluster.id),
                  14,
                );
                if (props.mapRef) {
                  const position = props.mapRef.getCenter();
                  if (position) {
                    props.mapRef.setZoom(expansionZoom);
                    props.mapRef.panTo({ lat: latitude, lng: longitude });
                    props.setMapCoords([
                      latitude,
                      longitude,
                    ]);
                  }
                };
              }}
            >
            </Marker>
          );
        }
        return (
          <Marker
            key={cluster.properties.siteID}
            position={{ lat: latitude, lng: longitude }}
            icon={iconType}
            title={cluster.properties.siteName}
            onClick={modalSetup}
          >
          </Marker>
        );
      })}

      {masterSwitch && props.heatpts.length > 0 && (
        <HeatmapLayer
          data={props.heatpts}
          options={props.heatpointConfigs}
        >
        </HeatmapLayer>
      )}

      {!masterSwitch && !minorSwitch && props.heatpts.length > 0 && (
        <HeatmapLayer
          data={props.heatpts}
          options={props.heatpointConfigs}
        >
        </HeatmapLayer>
      )}

      {props.tempMarker && <Marker position={props.tempMarker} icon={anchorIconGold}></Marker>}

      {!masterSwitch && minorSwitch && (
        <Marker
          position={dragPin}
          draggable={true}
          icon={mantaIcon}
          onLoad={handlePinLoad}
          onDragEnd={handleDragEnd}
        >
        </Marker>
      )}
    </GoogleMap>
  );
}
