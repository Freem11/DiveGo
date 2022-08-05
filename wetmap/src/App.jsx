import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import MapPage from "./components/MapPage";
import PinMapPage from "./components/PinMapPage";
import AdminPage from "./components/adminComponents/adminPage"
import "./App.css";
import { SliderContext } from "./components/contexts/sliderContext";
import { AnimalContext } from "./components/contexts/animalContext";
import { ZoomContext } from "./components/contexts/mapZoomContext";
import { CoordsContext } from "./components/contexts/mapCoordsContext";
import { PinContext } from "./components/contexts/pinContext";
import { PicModalContext } from "./components/contexts/picModalContext";
import { JumpContext } from "./components/contexts/jumpContext";
import { DiveSitesContext } from "./components/contexts/diveSitesContext";
import { AdminContext } from "./components/contexts/adminContext";

function App() {

  const [adminStat, setAdminStat] = useState(false);
  
  const d = new Date();
  const [sliderVal, setSliderVal] = useState(d.getMonth());
  const [animalVal, setAnimalVal] = useState("None");

  const [mapCoords, setMapCoords] = useState([49.246292, -123.116226]);
  const [mapZoom, setMapZoom] = useState(10);

  const [picModal, setPicModal] = useState(false);
  const [jump, setJump] = useState(false);

  const [divesTog, setDivesTog] = useState(true);

  const [pin, setPin] = useState({
    PicFile: "",
    Animal: "",
    PicDate: "",
    Latitude: "",
    Longitude: "",
  });

  return (
    <div className="App">
      <AdminContext.Provider value={{ adminStat, setAdminStat }}>
      <SliderContext.Provider value={{ sliderVal, setSliderVal }}>
        <AnimalContext.Provider value={{ animalVal, setAnimalVal }}>
          <ZoomContext.Provider value={{ mapZoom, setMapZoom }}>
            <CoordsContext.Provider value={{ mapCoords, setMapCoords }}>
              <PinContext.Provider value={{ pin, setPin }}>
                <PicModalContext.Provider value={{ picModal, setPicModal }}>
                  <JumpContext.Provider value={{jump, setJump}}>
                    <DiveSitesContext.Provider value={{divesTog, setDivesTog}}>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<MapPage />} />
                      <Route path="/pinDrop" element={<PinMapPage />} />
                      <Route path="/admin" element={<AdminPage />} />
                    </Routes>
                  </BrowserRouter>
                  </DiveSitesContext.Provider>
                  </JumpContext.Provider>
                </PicModalContext.Provider>
              </PinContext.Provider>
            </CoordsContext.Provider>
          </ZoomContext.Provider>
        </AnimalContext.Provider>
      </SliderContext.Provider>
      </AdminContext.Provider>
    </div>
  );
}

export default App;
