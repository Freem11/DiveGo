import { combineComponents } from '../combineComponents';

import AreaPicsContextProvider from './areaPicsContext';
import SearchTextContextProvider from './searchTextContext';
import PullTabContextProvider from './pullTabContext';
import CarrouselTilesContextProvider from './carrouselTilesContext';
import UserProfileContextProvider from './userProfileContext';
import AnimalContextProvider from './animalContext';
import PinContextProvider from './staticPinContext';
import SelectedPictureContextProvider from './selectedPictureContext';
import SitesArrayContextProvider from './sitesArrayContext';
import ModalContextProvider from '../reusables/modal/contextProvider';
import { MapContextProvider } from '../googleMap/mapContextProvider';
import { DiveSiteContextProvider } from './diveSiteContextProvider';
import { DiveShopContextProvider } from './diveShopContextProvider';
import { PhotoContextProvider } from './photoContextProvider';

const providers = [
  AreaPicsContextProvider,
  SearchTextContextProvider,
  PullTabContextProvider,
  CarrouselTilesContextProvider,
  UserProfileContextProvider,
  MapContextProvider,
  AnimalContextProvider,
  PinContextProvider,
  SelectedPictureContextProvider,
  SitesArrayContextProvider,
  ModalContextProvider,
  DiveSiteContextProvider,
  DiveShopContextProvider,
  PhotoContextProvider,
];

export const AppContextProvider = combineComponents(...providers);
