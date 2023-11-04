import React from "react";
import Logo from "./logo/logo";
import Home from "./googleMap";
import FormModal from "./modals/formModal";
import FormGuideModal from "./modals/formGuideModal";
import AdminPortal from "./adminPortal";
import PicUploader from "./modals/picUploader";
import SiteSubmitter from "./modals/siteSubmitter";
import HowToGuide from "./modals/howToGuide";
import Settings from "./modals/setting";
import DiveSiteAutoComplete from "./diveSiteSearch/diveSiteSearch";
import PlacesAutoComplete from "./locationSearch/placesAutocomplete";
import PhotoMenu from "./photoMenu/photoMenu2";
import { useState, useContext, useEffect } from "react";
import { grabProfileById } from "./../supabaseCalls/accountSupabaseCalls";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import Collapse from "@mui/material/Collapse";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import AnchorIcon from "@mui/icons-material/Anchor";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { DiveSitesContext } from "./contexts/diveSitesContext";
import { AnimalContext } from "./contexts/animalContext";
import { PicModalContext } from "./contexts/picModalContext";
import { GeoCoderContext } from "./contexts/geoCoderContext";
import { AnimalRevealContext } from "./contexts/animalRevealContext";
import { MasterContext } from "./contexts/masterContext";
import { LightBoxContext } from "./contexts/lightBoxContext";
import { SelectedPicContext } from "./contexts/selectPicContext";
import { ZoomContext } from "./contexts/mapZoomContext";
import { UserProfileContext } from "./contexts/userProfileContext";
import { SessionContext } from "./contexts/sessionContext";
import { PinContext } from "./contexts/staticPinContext";
import { DiveSpotContext } from "./contexts/diveSpotContext";

import Lightbox from "react-image-lightbox";
import "./mapPage.css";
import AnimalTopAutoSuggest from "./animalTags/animalTagContainer";
import Histogram from "./histogram/histogramBody";

const diveSiteSearchZone = (
  <div style={{ marginLeft: "-300px", marginTop: "7px" }}>
    <DiveSiteAutoComplete></DiveSiteAutoComplete>
  </div>
);

const locationSearchZone = (
  <div style={{ marginLeft: "-305px", marginTop: "0px", width: "220px" }}>
    <PlacesAutoComplete></PlacesAutoComplete>
  </div>
);

const adminPortalZone = (
  <div style={{ marginLeft: "10px", marginBottom: "40px" }}>
    <AdminPortal></AdminPortal>
  </div>
);

const MapPage = React.memo(() => {
  const { activeSession, setActiveSession } = useContext(SessionContext);
  const { profile, setProfile } = useContext(UserProfileContext);
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);
  const { divesTog, setDivesTog } = useContext(DiveSitesContext);
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const { animalVal } = useContext(AnimalContext);
  const { showGeoCoder, setShowGeoCoder } = useContext(GeoCoderContext);
  const { showAnimalSearch, setShowAnimalSearch } = useContext(
    AnimalRevealContext
  );
  const { pin, setPin } = useContext(PinContext);
  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);

  const { lightbox, setLightbox } = useContext(LightBoxContext);
  const { selectedPic } = useContext(SelectedPicContext);
  const { mapZoom, setMapZoom } = useContext(ZoomContext);
  const { picModal, setPicModal } = useContext(PicModalContext);

  const togglePicModal = () => {
    setPicModal(!picModal);
  };

  const [diveSiteModal, setDiveSiteModal] = useState(false);

  const toggleDiveSiteModal = () => {
    setDiveSiteModal(!diveSiteModal);
  };

  const [guideModal, setGuideModal] = useState(false);

  const toggleGuideModal = () => {
    setGuideModal(!guideModal);
  };

  const [gearModal, setGearModal] = useState(false);

  const toggleGearModal = () => {
    setGearModal(!gearModal);
  };

  const returnToPicModal = () => {
    setPicModal(true);
    setMasterSwitch(true);
  };


  useEffect(() => {
    const getProfile = async () => {
      let sessionUserId = activeSession.user.id;
      try {
        const success = await grabProfileById(sessionUserId);
        if (success) {
          // let bully = success[0].UserName;
          setProfile(success)
          setPin({ ...pin, UserID: success[0].UserID, UserName: success[0].UserName });
          setAddSiteVals({ ...addSiteVals, UserID: success[0].UserID, UserName: success[0].UserName });
          // if (bully == null) {
          //   setGuideModal(!guideModal);
          // }
        }
      } catch (e) {
        console.log({ title: "Error", message: e.message });
      }
    };

    getProfile();
  }, []);

  const toggleButtonStyle = {
	"&.Mui-selected": { backgroundColor: "aquamarine" },
	"&.Mui-selected:hover": { backgroundColor: "gold", color: "black" },
	"&:hover": {
		color: "black",
		backgroundColor: "gold"
	},
	backgroundColor: "black",
	height: "48px",
	width:  "48px",
	border: "1px solid black",
	marginTop: "5px",
	color: "aquamarine",
	boxShadow: "-2px 4px 4px #00000064",
	borderRadius: "100%"
  }

  return (
    <div className="mappagemaster">
		{masterSwitch && (
			<div className="col2rowT">
        <AnimalTopAutoSuggest />
			</div>
		)}

    <div className="fabButtons">

    {masterSwitch && ( <div className="gearBox">
        <ToggleButton
          sx={ toggleButtonStyle }
          value="check"
          selected={gearModal}
          onChange={() => {
            setGearModal(toggleGearModal);
          }}
        >
          <SettingsIcon sx={{height: "39px", width: "39px"}}/>
        </ToggleButton>
      </div>)}

      {masterSwitch && (<div className="howToBox">
        <ToggleButton
          sx={ toggleButtonStyle }
          value="check"
          selected={guideModal}
          onChange={() => {
            setGuideModal(toggleGuideModal);
          }}
        >
          <QuestionMarkIcon sx={{height: "40px", width: "40px"}}/>
        </ToggleButton>
      </div>)}

      {masterSwitch && (<div
        className="NavBox"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <ToggleButton
          sx={ toggleButtonStyle }
          value="check"
          selected={showGeoCoder}
          onChange={() => {
            setShowGeoCoder(!showGeoCoder);
          }}
        >
          <ExploreIcon sx={{height: "37px", width: "37px"}}/>
        </ToggleButton>
        {/* <Collapse
          in={showGeoCoder}
          orientation="horizontal"
          collapsedSize="0px"
        >
          {locationSearchZone}
        </Collapse> */}
      </div>)}

      {masterSwitch && (<div
        className="diveSiteBox"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <ToggleButton
          sx={ toggleButtonStyle }
          value="check"
          selected={showAnimalSearch}
          onChange={() => {
            setShowAnimalSearch(!showAnimalSearch);
          }}
        >
          <TravelExploreIcon sx={{height: "36px", width: "36px"}}/>
        </ToggleButton>
        <Collapse
          in={showAnimalSearch}
          orientation="horizontal"
          collapsedSize="0px"
        >
          {diveSiteSearchZone}
        </Collapse>
      </div>)}

      {masterSwitch && (<div className="PhotoBox">
        <ToggleButton
          sx={ toggleButtonStyle }
          value="check"
          selected={picModal}
          onChange={() => {
            setPicModal(togglePicModal);
          }}
        >
          <PhotoCameraIcon sx={{height: "36px", width: "36px"}}/>
        </ToggleButton>
      </div>)}

      {masterSwitch && (<div className="diveAddBox">
        <ToggleButton
          sx={ toggleButtonStyle }
          value="check"
          selected={diveSiteModal}
          onChange={() => {
            setDiveSiteModal(toggleDiveSiteModal);
          }}
        >
          <AddLocationAltIcon sx={{height: "38px", width: "38px"}}/>
        </ToggleButton>
      </div>)}

      {masterSwitch && ( <div className="AnchorBox">
        {" "}
        <ToggleButton
          sx={ toggleButtonStyle }
          value="check"
          selected={divesTog}
          onChange={() => {
            setDivesTog(!divesTog);
          }}
        >
          <AnchorIcon sx={{height: "37px", width: "37px"}}/>
        </ToggleButton>
      </div>)}

    

      

     

      
      
	  </div>
      {masterSwitch && (<div className="col1row8">
        <PhotoMenu/>
      </div>)}

      <div className="col1rowB">
        <Collapse
          in={showAdminPortal}
          orientation="horizontal"
          collapsedSize="0px"
        >
          {adminPortalZone}
        </Collapse>
        <Logo
          setShowAdminPortal={setShowAdminPortal}
          showAdminPortal={showAdminPortal}
        />
      </div>

      {masterSwitch && (<div className="col2rowB" style={{pointerEvents: "none"}}>
        <Histogram pointerEvents={'none'}/>
        </div>)}

     <div>
        <Home
          style={{
            // position: "absolute",
            zIndex: "1",
            height: "100%",
          }}
        ></Home>
      </div>

      <div className="just-testing2">
      <div
        className="colXrow1"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <ToggleButton
          sx={ toggleButtonStyle }
          value="check"
          onClick={() => {
            setMapZoom(mapZoom + 1);
          }}
        >
          <AddIcon sx={{height: "40px", width: "40px"}}/>
        </ToggleButton>
      </div>

      <div
        className="colXrow2"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <ToggleButton
          sx={ toggleButtonStyle }
          value="check"
          onClick={() => {
            setMapZoom(mapZoom - 1);
          }}
        >
          <RemoveIcon sx={{height: "40px", width: "40px"}}/>
        </ToggleButton>
        </div>
        </div>

      {!masterSwitch && (<div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          width: "90%",
          marginLeft: "10%",
          top: "5px",
          zIndex: "2",
        }}
      >
        <div
          style={{
            width: "90%",
            position: "relative",
            zIndex: "2",
          }}
        >
          <Button
            onClick={returnToPicModal}
            sx={{
              "&:hover": { backgroundColor: "lightblue" },
              color: "gold",
              fontFamily: "Permanent Marker, cursive",
              fontSize: '15px',
              width: '10%',
              height: "80%",
              textAlign: "center",
              backgroundColor: "#538bdb",
              marginTop: "15px",
              borderRadius: "10px",
              boxShadow: " 5px 5px 5px 5px rgba(0,0,0, 0.7)"
            }}
          >
            Set Pin
          </Button>
        </div>
      </div>)}

      <FormModal openup={picModal} closeup={togglePicModal}>
        <PicUploader closeup={togglePicModal} />
      </FormModal>

      <FormModal openup={diveSiteModal} closeup={toggleDiveSiteModal}>
        <SiteSubmitter closeup={toggleDiveSiteModal} />
      </FormModal>

      <FormGuideModal openup={guideModal} closeup={toggleGuideModal}>
        <HowToGuide closeup={toggleGuideModal} />
      </FormGuideModal>


      <FormModal openup={gearModal} closeup={toggleGearModal}>
        <Settings closeup={toggleGearModal} />
      </FormModal>

      {lightbox && (
          <Lightbox
            mainSrc={selectedPic}
            onCloseRequest={() => setLightbox(false)}
          />
        )}
    </div>
  );
});

export default MapPage;
