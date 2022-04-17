import React from 'react';
import { styled } from '@mui/material';
import { Login, LogoutView, ReSettingPwVerify } from '@components/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MyInfo } from '@components/MyInfo';
import useStore from '@src/hooks/useStore';
import { useObserver } from 'mobx-react';
import Items from './Items';

const MainPage = () => {
  const { AuthStore } = useStore();

  const handleClickLogoutBtn = () => {
    AuthStore.logout();
  };

  return useObserver(() => (
    <RootDiv>
      <BrowserRouter>
        <BannerDiv>
          ABLY 앱 설치하고 무료배송 혜택 받으세요
          <LoginDiv>{AuthStore.getLogin() ? <LogoutView onClick={handleClickLogoutBtn} /> : <Login />} </LoginDiv>
        </BannerDiv>
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/user" element={<MyInfo />} />
          <Route path="/setting/repassword" element={<ReSettingPwVerify />} />
        </Routes>
      </BrowserRouter>
    </RootDiv>
  ));
};

const RootDiv = styled('div')`
  display: block;
  align-items: center;
  width: 100%;
`;

const BannerDiv = styled('div')`
  display: flex;
  align-items: center;
  background-color: #ff5160;
  max-width: 600px;
  height: 52px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  line-height: 13px;
  padding: 0 0 0 10px;
`;

const LoginDiv = styled('div')`
  margin: 0 0 0 18.5rem;
`;

export default MainPage;
