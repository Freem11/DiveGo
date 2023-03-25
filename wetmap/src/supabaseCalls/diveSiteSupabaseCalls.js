import { supabase } from "../supabase";

export const diveSites = async (GPSBubble) => {

  let minLatx, maxLatx, minLngx, maxLngx;

  if (GPSBubble.minLat) {
    minLatx = GPSBubble.minLat;
    maxLatx = GPSBubble.maxLat;
    minLngx = GPSBubble.minLng;
    maxLngx = GPSBubble.maxLng;
  } else {
    minLatx = GPSBubble.southWest.latitude;
    maxLatx = GPSBubble.northEast.latitude;
    minLngx = GPSBubble.southWest.longitude;
    maxLngx = GPSBubble.northEast.longitude;
  }

  const { data, error } = await supabase
  .from("diveSites")
  .select()
  .gte('lat', minLatx)
  .gte('lng', minLngx)
  .lte('lat', maxLatx)
  .lte('lng', maxLngx)

if (error) {
  console.log("couldn't do it,", error)
  return([])
}

if (data) {
  return data
}
};


export const insertDiveSite = async (values) => {

  const { data, error } = await supabase
  .from("diveSites")
  .insert([
    {
      name: values.name,
      lat: values.lat,
      lng: values.lng,
      UserID: values.UserID
    },
  ]);

if (error) {
  console.log("couldn't do it,", error);
}

if (data) {
  console.log(data);
}
};