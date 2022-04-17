import Repository from '@repository/Repository';
import { LoginInDto } from '@src/types';
import { getCookie, setCookie } from '@utils/cookie';

interface AuthStoreType {
  authCode: number;
  login: (email: string, password: string) => Promise<boolean>;
  getAccessToken: () => string;
  setAuthCode: (code: number) => void;
  getAuthCode: () => number;
}

const AuthStore: AuthStoreType = {
  authCode: -1,

  async login(email: string, password: string): Promise<boolean> {
    const postLoginDto: LoginInDto = {
      email,
      password,
    };

    try {
      const result = await Repository.postLogin(postLoginDto);
      setCookie('accessToken', result.accessToken);
      return true;
    } catch (error) {
      console.error('login fail');
      throw error;
    }
  },

  getAccessToken() {
    return getCookie('accessToken');
  },

  setAuthCode(code: number) {
    this.authCode = code;
  },

  getAuthCode() {
    return this.authCode;
  },
};

export default AuthStore;
