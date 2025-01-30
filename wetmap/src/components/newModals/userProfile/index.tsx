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

type UserProps = Partial<ModalHandleProps> & {
  userProfileID?: string
};
export default function UserProfile(props: UserProps) {
  const { activeSession } = useContext(SessionContext);
  const { profile, setProfile }          = useContext(UserProfileContext);
  const { modalShow }                    = useContext(ModalContext);
  const [openedProfile, setOpenedProfile] = useState<ActiveProfile | null>(null);
  const isActiveProfile: boolean = !props.userProfileID;
  const [userFollows, setUserFollows] = useState(false);
  const [followRecordID, setFollowRecordID] = useState(activeSession?.user.id);

  async function followCheck() {
    if (props.userProfileID) {
      const selectedProfile = await grabProfileById(props.userProfileID);
      const alreadyFollows = await checkIfUserFollows(
        profile?.UserID,
        selectedProfile?.UserID,
      );
      if (alreadyFollows && alreadyFollows.length > 0) {
        setUserFollows(true);
        setFollowRecordID(alreadyFollows[0].id);
      }
      setOpenedProfile(selectedProfile);
    } else {
      setOpenedProfile(profile);
    }
  }

  useEffect(() => {
    followCheck();
  }, [props.userProfileID, userFollows]);


  const handleFollow = async () => {
    if (userFollows) {
      deleteUserFollow(followRecordID);
      setUserFollows(false);
    } else {
      if (profile) {
        const newRecord = await insertUserFollow(
          profile.UserID,
          openedProfile?.UserID,
        );
        setFollowRecordID(newRecord && newRecord[0].id);
        setUserFollows(true);
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

  const openSettings = () => {
    modalShow(Settings);
  };

  return (
    <UserProfileView
      onClose={props.onModalCancel}
      profile={openedProfile}
      handleProfileBioChange={handleProfileBioChange}
      handleProfileNameChange={handleProfileNameChange}
      handleFollow={handleFollow}
      openSettings={openSettings}
      isActiveProfile={isActiveProfile}
      handleImageSelection={() => {}}
      isFollowing={userFollows}
    />
  );
}
