import React, { useState, useContext } from 'react';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { SelectedPictureContext } from '../../contexts/selectedPictureContext';
import {
  insertPhotoLike,
  deletePhotoLike,
} from '../../../supabaseCalls/photoLikeSupabaseCalls';
import UserProfile from '../../newModals/userProfile';
import { ModalContext } from '../../reusables/modal/context';
import CommentsModal from '../../newModals/commentsModal';
import FullScreenImage from '../fullScreenImage/fullScreenImage';
import SeaLifeImageCardView from './view';
import { PhotoWithLikesAndComments } from '../../../entities/photos';
import { getSingleDiveSite } from '../../../supabaseCalls/diveSiteSupabaseCalls';
import { DiveSiteContext } from '../../contexts/diveSiteContext';
import { MapContext } from '../../googleMap/mapContext';
import DiveSite from '../../newModals/diveSite';

export default function SeaLifeImageCard(props: { pic: PhotoWithLikesAndComments, isShowAuthor?: boolean }) {
  const { pic, isShowAuthor = true } = props;
  const { profile } = useContext(UserProfileContext);
  const [picLiked, setPicLiked] = useState(pic.likedbyuser);
  const [likeData, setLikeData] = useState(pic.likeid);
  const [countOfLikes, setCountOfLikes] = useState(pic.likecount);
  const { setSelectedPicture } = useContext(SelectedPictureContext);
  const { setSelectedDiveSite } = useContext(DiveSiteContext);
  const { mapRef } = useContext(MapContext);
  const { modalShow } = useContext(ModalContext);
  const photoName = pic.photoFile.split('/').pop();

  const handleProfileSwitch = async (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>, userId: string) => {
    e.stopPropagation();

    if (profile?.UserID === userId) {
      return;
    }
    modalShow(UserProfile, {
      keepPreviousModal: true,
      userProfileID:     userId,
      size:              'large',

    });
  };

  const handleCommentModal = () => {
    modalShow(CommentsModal, {
      keepPreviousModal: true,
    });
    setSelectedPicture(pic);
  };

  const handleLike = async (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    e.stopPropagation();
    if (picLiked) {
      deletePhotoLike(likeData);
      setPicLiked(false);
      setCountOfLikes(countOfLikes - 1);
    } else {
      if (profile) {
        const newRecord = await insertPhotoLike(profile?.UserID, pic.id);
        setPicLiked(true);
        setLikeData(newRecord && newRecord[0].id);
        setCountOfLikes(countOfLikes + 1);
      }
    }
  };

  const handleDiveSiteMove = async (lat: number, lng: number) => {
    const getSite = await getSingleDiveSite(lat, lng);
    if (getSite) {
      setSelectedDiveSite(getSite[0]);
      mapRef?.panTo({ lat: getSite[0].lat, lng: getSite[0].lng });
      modalShow(DiveSite, {
        id:   getSite[0].id,
        size: 'large',
      });
    }
  };


  const handleModalOpen = () => {
    modalShow(FullScreenImage, {
      keepPreviousModal: true,
      size:              'full',
      src:               `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`,
    });
  };

  return (
    <SeaLifeImageCardView
      pic={pic}
      handleModalOpen={handleModalOpen}
      handleLike={handleLike}
      handleCommentModal={handleCommentModal}
      handleProfileSwitch={handleProfileSwitch}
      handleDiveSiteMove={handleDiveSiteMove}
      countOfLikes={countOfLikes}
      picLiked={picLiked}
      isShowAuthor={isShowAuthor}
    />
  );
}
