import React from 'react';
import styled from '@emotion/styled';
import DefaultProfile from '@assets/defaultProfile.jpeg';
import { UserInfo } from '@src/types';

export interface Props {
  name: string;
  emailAddress: string;
  profileImg?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>, userInfo: UserInfo) => void;
}

const UserCardView = ({ name, emailAddress, profileImg = 'default', onClick: handleClick }: Props) => {
  const handleClickProfileCardView = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof handleClick === 'function') handleClick(e, { name, emailAddress, profile: profileImg });
  };

  return (
    <RootWrapperDiv onClick={handleClickProfileCardView}>
      <ProfileImg src={profileImg !== 'default' ? profileImg : DefaultProfile} alt="profile" />
      <WrapperDiv>
        <ProtocolDiv>{name}</ProtocolDiv>
        <MailDiv>{emailAddress}</MailDiv>
      </WrapperDiv>
    </RootWrapperDiv>
  );
};

const RootWrapperDiv = styled.div`
  display: flex;
  height: 3.75rem;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 2.375rem;
  height: 2.375rem;
  margin: 0 0 0 1rem;
`;

const WrapperDiv = styled.div`
  display: block;
  padding: 0 0 0 0.75rem;
`;

const ProtocolDiv = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
  color: #191919;
  line-height: 1.5rem;
`;

const MailDiv = styled.div`
  font-weight: 300;
  font-size: 0.813rem;
  color: #999999;
  line-height: 0.975rem;
`;

export default UserCardView;
