import { combineComponents } from '../combineComponents';

import AreaPicsContextProvider from './areaPicsContext';
import SearchTextContextProvider from './searchTextContext';
import DiveSiteAdderModalContextProvider from './diveSiteAdderModalContext';
import PartnerModalContextProvider from './partnerAccountRequestModalContext';
import PullTabContextProvider from './pullTabContext';
import CarrouselTilesContextProvider from './carrouselTilesContext';
import ThirdTutorialModalContextProvider from './thirdTutorialModalContext';
import SecondTutorialModalContextProvider from './secondTutorialModalContext';
import TutorialModalContextProvider from './tutorialModalContext';
import ChapterContextProvider from './chapterContext';
import ReverseContextProvider from './reverseContext';
import TutorialResetContextProvider from './tutorialResetContext';
import ModalSelectContextProvider from './modalSelectContext';
import UserProfileContextProvider from './userProfileContext';
import HeatPointsContextProvider from './heatPointsContext';
import AnimalMultiSelectContextProvider from './animalMultiSelectContext';
import MapBoundsContextProvider from './mapBoundariesContext';
import LightBoxContextProvider from './lightBoxContext';
import SelectedPicContextProvider from './selectPicContext';
import SelectedDiveSiteContextProvider from './selectedDiveSiteContext';
import MasterContextProvider from './masterContext';
import MinorContextProvider from './minorContext';
import DiveSpotContextProvider from './diveSpotContext';
import PinSpotContextProvider from './pinSpotContext';
import AnimalRevealContextProvider from './animalRevealContext';
import GeoCoderContextProvider from './geoCoderContext';
import PictureContextProvider from './pictureContext';
import SliderContextProvider from './sliderContext';
import AnimalContextProvider from './animalContext';
import ZoomContextProvider from './mapZoomContext';
import PinContextProvider from './staticPinContext';
import PicModalContextProvider from './picModalContext';
import JumpContextProvider from './jumpContext';
import DiveSitesContextProvider from './diveSitesContext';
import SelectedPictureContextProvider from './selectedPictureContext';
import SelectedShopContextProvider from './selectedShopContext';
import ShopModalContextProvider from './shopModalContext';
import ZoomHelperContextProvider from './zoomHelperContext';
import SitesArrayContextProvider from './sitesArrayContext';
import ModalContextProvider from './modalContextProvider';
import MapConfigContextProvider from './mapConfigContext';

const providers = [
  AreaPicsContextProvider,
  SearchTextContextProvider,
  DiveSiteAdderModalContextProvider,
  PartnerModalContextProvider,
  PullTabContextProvider,
  CarrouselTilesContextProvider,
  ThirdTutorialModalContextProvider,
  SecondTutorialModalContextProvider,
  TutorialModalContextProvider,
  ChapterContextProvider,
  ReverseContextProvider,
  TutorialResetContextProvider,
  ModalSelectContextProvider,
  UserProfileContextProvider,
  HeatPointsContextProvider,
  AnimalMultiSelectContextProvider,
  MapBoundsContextProvider,
  LightBoxContextProvider,
  SelectedPicContextProvider,
  SelectedDiveSiteContextProvider,
  MasterContextProvider,
  MinorContextProvider,
  DiveSpotContextProvider,
  PinSpotContextProvider,
  AnimalRevealContextProvider,
  GeoCoderContextProvider,
  PictureContextProvider,
  SliderContextProvider,
  AnimalContextProvider,
  ZoomContextProvider,
  PinContextProvider,
  PicModalContextProvider,
  JumpContextProvider,
  DiveSitesContextProvider,
  SelectedPictureContextProvider,
  SelectedShopContextProvider,
  ShopModalContextProvider,
  ZoomHelperContextProvider,
  SitesArrayContextProvider,
  ModalContextProvider,
  MapConfigContextProvider,
];

export const AppContextProvider = combineComponents(...providers);
