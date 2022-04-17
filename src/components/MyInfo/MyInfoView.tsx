import React from 'react';
import UserCardView from './UserCard/UserCardView';

interface Props {
  emailAddress: string;
  name: string;
  profileImg: string;
}

const MyInfoView = ({ emailAddress, name, profileImg }: Props) => {
  return (
    <>
      <UserCardView emailAddress={emailAddress} name={name} profileImg={profileImg} />
      <div>fasd</div>
    </>
  );
};

export default MyInfoView;
