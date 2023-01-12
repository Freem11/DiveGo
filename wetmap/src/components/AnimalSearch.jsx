import { useState, useContext } from "react";
import { AnimalContext } from "./contexts/animalContext";
import { useEffect } from "react";
import { photos } from "./data/testdata";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { diveSites } from "../supabaseCalls/diveSiteSupabaseCalls";
// import { getAnimalNames } from "../supabaseCalls/photoSupabaseCalls";
// import { getAnimalNames } from "../axiosCalls/photoAxiosCalls";
import { AnimalRevealContext } from "./contexts/animalRevealContext";
import { SelectedDiveSiteContext } from "./contexts/selectedDiveSiteContext";
import { MapBoundsContext } from "./contexts/mapBoundariesContext";

export default function AnimalSearcher() {
  const { selectedDiveSite, setSelectedDiveSite } = useContext(SelectedDiveSiteContext);
  const { boundaries, setBoundaries}  = useContext(MapBoundsContext);
  const { setShowAnimalSearch } = useContext(AnimalRevealContext);
  const { setAnimalVal } = useContext(AnimalContext);
  const [list, setList] = useState([]);

  let diveSiteNames


  const handleDiveSiteList = async () => {
    let diveSiteArray = []

    let minLat = boundaries[1]
    let maxLat = boundaries[3]

    let minLng = boundaries[0] 
    let maxLng = boundaries[2]

    diveSiteNames = null
    diveSiteArray = []

    if (boundaries.length > 0 ){
    diveSiteNames = await diveSites({minLat, maxLat, minLng, maxLng});  
    }

    if (diveSiteNames){
    diveSiteNames.forEach((site) => {
        if (!diveSiteArray.includes(site.name)){
          diveSiteArray.push(site.name)
        }
    })
  }

    setList(diveSiteArray);

  }

  useEffect(async() => {
    handleDiveSiteList()
  }, []);

  useEffect(async() => {
    handleDiveSiteList()
  }, [boundaries]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={list}
      onChange={(event, value) => {
        if (!value) {
          setAnimalVal("All");
          setShowAnimalSearch(!setShowAnimalSearch);
        } else {
          setAnimalVal(value);
          setShowAnimalSearch(!setShowAnimalSearch);
        }
      }}
      sx={{
        "&.Mui-selected": { opacity: "80%" },
        "&.Mui-selected:hover": { opacity: "80%" },
        "&:hover": { opacity: "80%" },
        width: 222,
        height: 40,
        backgroundColor: "white",
        opacity: "70%",
        borderRadius: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "5px",
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Dive Site"
          variant="standard"
          sx={{ paddingLeft: "0px" }}
        />
      )}
    ></Autocomplete>
  );
}
