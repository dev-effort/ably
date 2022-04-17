import React from 'react';
import AuthStore from '@stores/AuthStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginView from './LoginView';

const Login = () => {
  const nav = useNavigate();

  const handleLogin = async () => {
    const id = document.querySelector('.id')?.getElementsByTagName('input')[0].value as string;
    const pw = document.querySelector('.pw')?.getElementsByTagName('input')[0].value as string;

    try {
      await AuthStore.login(id, pw);
      nav('/user');
      return 200;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.status;
        }
      }
      throw error;
    }
  };

  return <LoginView onLogin={handleLogin} />;
};

export default Login;
