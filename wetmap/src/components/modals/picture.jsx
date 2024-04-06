import React, { useState, useContext, useEffect } from "react";
import { SelectedPicContext } from "../contexts/selectPicContext";
import { UserProfileContext } from "../contexts/userProfileContext";

import {
  insertPhotoLike,
  deletePhotoLike,
} from "../../supabaseCalls/photoLikeSupabaseCalls";
import FlagIcon from "@mui/icons-material/Flag";
import notLiked from "../../images/Hand-Hollow-Blue.png";
import liked from "../../images/Hand-Filled-Blue.png";
import "./picture.css";

function Picture(props) {
  const { pic, animateFullScreenModal } = props;
  const { profile } = useContext(UserProfileContext);
  const { setSelectedPic, selectedPic } = useContext(SelectedPicContext);
  const [picLiked, setPicLiked] = useState(pic.likedbyuser);
  const [likeData, setLikeData] = useState(pic.likeid);
  const [countOfLikes, setCountOfLikes] = useState(pic.likecount);

  let photoName = pic.photofile.split("/").pop();

  const [imgHeigth, setImgHeigth] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);

  const handleLike = async (e) => {
    e.stopPropagation();

    if (picLiked) {
      deletePhotoLike(likeData);
      setPicLiked(false);
      setCountOfLikes(countOfLikes - 1);
    } else {
      const newRecord = await insertPhotoLike(profile[0].UserID, pic.id);
        setPicLiked(true);
        setLikeData(newRecord[0].id);
        setCountOfLikes(countOfLikes + 1);
    }
  };

  const handleModalOpen = (picture) => {
    setSelectedPic(picture);
    animateFullScreenModal();
  };

  const getImageDimensions = async () => {
    let containerWidth = document.getElementsByClassName("picScollA")[0]
      .clientWidth;

    const img = new Image();
    img.src = `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`;
    const imageBitmap = await createImageBitmap(img);
    let ratio = imageBitmap.height / imageBitmap.width;
    setImgWidth(containerWidth);
    setImgHeigth(containerWidth * ratio);
  };

  useEffect(() => {
    getImageDimensions();
  }, [pic]);

  return (
    <div
      key={pic.id}
      className="pictureBoxQ"
      onClick={() => handleModalOpen(photoName)}
      style={{
        backgroundImage: `url(https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: imgWidth,
        height: imgHeigth,
      }}
    >
      <div className="helper">
        <h4 className="animalLabelP">{pic.label}</h4>
        <a
          className="atagp"
          href={`mailto:DiveGo2022@gmail.com?subject=Reporting%20issue%20with%20picture:%20"${pic.label}"%20${pic.photofile}&body=Type%20of%20issue:%0D%0A%0D%0A%0D%0A%0D%0A1)%20Animal%20name%20not%20correct%0D%0A%0D%0A(Please%20provide%20correct%20animal%20name%20and%20we%20will%20correct%20the%20record)%0D%0A%0D%0A%0D%0A%0D%0A2)%20Copy%20write%20image%20claim%0D%0A%0D%0A(Please%20provide%20proof%20that%20you%20own%20the%20submitted%20photo%20and%20we%20will%20remove%20it%20as%20you%20have%20requested)`}
        >
          <FlagIcon sx={{ color: "red", height: "3vh", width: "3vw" }} />
        </a>
      </div>
      <h4 className="userLabel">Added by: {pic.newusername}</h4>

      {countOfLikes > 0 ? (
        <div className="countIndicator">
          <p className="countDisplay">{countOfLikes}</p>
        </div>
      ) : null}
      <img
        src={picLiked ? liked : notLiked}
        className="likeIcon"
        onClick={(e) => handleLike(e, pic.id)}
        style={{
          height: 30,
          width: 30,
        }}
      />
    </div>
  );
}

export default Picture;
