import React from 'react';
import { styled } from '@mui/material';
import { Login } from '@components/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MyInfo } from '@components/MyInfo';
import Items from './Items';

const MainPage = () => {
  return (
    <RootDiv>
      <BrowserRouter>
        <BannerDiv>
          ABLY 앱 설치하고 무료배송 혜택 받으세요
          <LoginDiv>
            <Login />
          </LoginDiv>
        </BannerDiv>
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/user" element={<MyInfo />} />
        </Routes>
      </BrowserRouter>
    </RootDiv>
  );
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
