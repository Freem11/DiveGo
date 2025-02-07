import { combineComponents } from '../combineComponents';

import AreaPicsContextProvider from './areaPicsContext';
import SearchTextContextProvider from './searchTextContext';
import PullTabContextProvider from './pullTabContext';
import CarrouselTilesContextProvider from './carrouselTilesContext';
import UserProfileContextProvider from './userProfileContext';
import AnimalContextProvider from './animalContext';
import SelectedPictureContextProvider from './selectedPictureContext';
import SitesArrayContextProvider from './sitesArrayContext';
import EditModeContextProvider from './editModeContext';
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
  SelectedPictureContextProvider,
  SitesArrayContextProvider,
  EditModeContextProvider,
  ModalContextProvider,
  DiveSiteContextProvider,
  DiveShopContextProvider,
  PhotoContextProvider,
];

export const AppContextProvider = combineComponents(...providers);
