import React, { useState, useContext, useEffect } from 'react';
import UserProfileView from './view';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ModalContext } from '../../reusables/modal/context';
import { ModalHandleProps } from '../../reusables/modal/types';
import {
  grabProfileById,
  updateProfile,
} from '../../../supabaseCalls/accountSupabaseCalls';
import {
  insertUserFollow,
  deleteUserFollow,
  checkIfUserFollows,
} from '../../../supabaseCalls/userFollowSupabaseCalls';
import { SessionContext } from '../../contexts/sessionContext';
import Settings from '../../newModals/setting';
import { ActiveProfile } from '../../../entities/profile';
import { toast } from 'react-toastify';
import screenData from '../screenData.json';
import { clearPreviousImage, handleImageUpload } from '../imageUploadHelpers';
import getPhotoPublicUrl from '../../../helpers/getPhotoPublicUrl';

type UserProps = Partial<ModalHandleProps> & {
  userProfileID?: string
};
export default function UserProfile(props: UserProps) {
  const { activeSession } = useContext(SessionContext);
  const { profile, setProfile }          = useContext(UserProfileContext);
  const { modalShow }                    = useContext(ModalContext);
  const [openedProfile, setOpenedProfile] = useState<ActiveProfile | null>(null);
  const [headerPictureUrl, setHeaderPictureUrl] = useState<string | null>(null);
  const isActiveProfile: boolean = !props.userProfileID;
  const [userIsFollowing, setUserIsFollowing] = useState(false);
  const [followRecordID, setFollowRecordID] = useState(activeSession?.user.id);

  async function profileCheck() {
    if (props.userProfileID) {
      const selectedProfile = await grabProfileById(props.userProfileID);
      setOpenedProfile(selectedProfile);
    } else {
      setOpenedProfile(profile);
    }
  }

  async function followCheck() {
    if (openedProfile && profile) {
      const alreadyFollows = await checkIfUserFollows(
        profile.UserID,
        openedProfile.UserID,
      );
      if (alreadyFollows && alreadyFollows.length > 0) {
        setUserIsFollowing(true);
        setFollowRecordID(alreadyFollows[0].id);
      }
    }
  }

  useEffect(() => {
    profileCheck();
  }, [props.userProfileID]);


  useEffect(() => {
    followCheck();
  }, [openedProfile]);


  const handleFollow = async () => {
    if (userIsFollowing) {
      deleteUserFollow(followRecordID);
      setUserIsFollowing(false);
    } else {
      if (profile) {
        const newRecord = await insertUserFollow(
          profile.UserID,
          openedProfile?.UserID,
        );
        setFollowRecordID(newRecord && newRecord[0].id);
        setUserIsFollowing(true);
      }
    }
  };

  const handleProfileNameChange = async (newName: string) => {
    if (newName == '') {
      toast.error(screenData.UserProfile.EmptyUserNameError);
      return false;
    }

    if (profile) {
      const response = await updateProfile({
        UserID:       profile!.UserID,
        UserName: newName,
      });
      if (!response.error) {
        toast.success(screenData.UserProfile.UserProfileUpdateSuccessMessage);
        setProfile({ ...profile, UserName: newName });
        return;
      }

      if (response.error.code == '23505') {
        toast.error(screenData.UserProfile.DuplicateUserNameErrorMessage);
        return;
      }

      toast.error(screenData.Toast.generalError);
    }
  };

  const handleProfileBioChange = async (newBio: string) => {
    if (profile) {
      if (profile) {
        const response = await updateProfile({
          UserID:       profile!.UserID,
          profileBio: newBio,
        });
        if (!response.error) {
          toast.success(screenData.UserProfile.UserProfileUpdateSuccessMessage);
          setProfile({ ...profile, profileBio: newBio });
          return;
        }


        toast.error(screenData.Toast.generalError);
      }
    }
  };

  const handleImageSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!openedProfile) {
      return;
    }
    if (openedProfile.profilePhoto) {
      clearPreviousImage(openedProfile.profilePhoto);
    }

    const createFileName = await handleImageUpload(event);
    await updateProfile({
      UserID:       profile!.UserID,
      profileBio: `animalphotos/public/${createFileName}`,
    });
    setOpenedProfile((prev) => {
      if (!prev) {
        return prev;
      }
      return {
        ...prev,
        profilePhoto: `animalphotos/public/${createFileName}`,
      };
    });
  };

  useEffect(() => {
    if (openedProfile?.profilePhoto) {
      const photoName = getPhotoPublicUrl(openedProfile.profilePhoto);
      setHeaderPictureUrl(photoName);
    } else {
      setHeaderPictureUrl(null);
    }
  }, [openedProfile?.profilePhoto]);


  const openSettings = () => {
    modalShow(Settings);
  };

  return (
    <UserProfileView
      onClose={props.onModalCancel}
      profile={openedProfile}
      handleImageSelection={handleImageSelection}
      handleProfileBioChange={handleProfileBioChange}
      handleProfileNameChange={handleProfileNameChange}
      handleFollow={handleFollow}
      openSettings={openSettings}
      headerPictureUrl={headerPictureUrl}
      isActiveProfile={isActiveProfile}
      isFollowing={userIsFollowing}
    />
  );
}
