import axios from "axios";

  export const uploadphoto = () => {

    return axios
      .post("/api/upload")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };

  export const getPhotoFileName = () => {

    return axios
      .get("/api/upload")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };