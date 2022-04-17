import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onClick: () => void;
}

const LogoutView = ({ onClick }: Props) => {
  const nav = useNavigate();

  const handleClick = () => {
    onClick();
    nav('/');
  };

  return <LogoutBtn onClick={handleClick}>Logout</LogoutBtn>;
};

const LogoutBtn = styled(Button)`
  color: black;
  border-radius: 3rem;
  border-color: #ffffff;
  background-color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  &:hover {
    border-color: #ffffff;
    background-color: #ffffff;
  }
`;

export default LogoutView;
