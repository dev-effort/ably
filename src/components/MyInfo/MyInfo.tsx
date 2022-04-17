import React, { useEffect } from 'react';
import useStore from '@src/hooks/useStore';
import { useNavigate } from 'react-router-dom';
import { useObserver } from 'mobx-react';
import MyInfoView from './MyInfoView';

const MyInfo = () => {
  const nav = useNavigate();
  const { UserStore } = useStore();

  useEffect(() => {
    requestUserData();
  });

  const requestUserData = async () => {
    try {
      await UserStore.getUserInfo();
    } catch (error) {
      nav('/');
    }
  };
  return useObserver(() => (
    <MyInfoView
      emailAddress={UserStore.getUserCardInfo()?.email as string}
      name={UserStore.getUserCardInfo()?.name as string}
      profileImg={UserStore.getUserCardInfo()?.profileImage as string}
    />
  ));
};

export default MyInfo;
