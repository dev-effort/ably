import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (key: string, value: string, option?: any) => {
  return cookies.set(key, value, { ...option });
};

export const getCookie = (key: string) => {
  return cookies.get(key);
};

export const removeCookie = (key: string) => {
  cookies.remove(key);
};

export const getAccessToken = () => {
  return cookies.get('accessToken');
};

export const removeAccessToken = () => {
  cookies.remove('accessToken');
};
