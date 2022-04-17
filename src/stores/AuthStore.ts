import Repository from '@repository/Repository';
import { LoginInDto, LogoutOutDto } from '@src/types';
import { getCookie, removeCookie, setCookie } from '@utils/cookie';
import { makeAutoObservable } from 'mobx';

class AuthStore {
  private authCode: number;

  isLogin: boolean;

  constructor() {
    makeAutoObservable(this);

    this.authCode = -1;
    this.isLogin = this.getLogin();
  }

  getLogin(): boolean {
    if (getCookie('accessToken')) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    return this.isLogin;
  }

  setLogin(status: boolean) {
    this.isLogin = status;
  }

  setAuthCode(code: number) {
    this.authCode = code;
  }

  getAuthCode() {
    return this.authCode;
  }

  async login(email: string, password: string): Promise<boolean> {
    const postLoginDto: LoginInDto = {
      email,
      password,
    };

    try {
      const result = await Repository.postLogin(postLoginDto);
      setCookie('accessToken', result.accessToken);
      this.setLogin(true);
      return true;
    } catch (error) {
      console.error('login fail');
      throw error;
    }
  }

  async logout(): Promise<LogoutOutDto> {
    try {
      const result = await Repository.postLogout(getCookie('accessToken'));
      removeCookie('accessToken');
      this.setLogin(false);
      return result;
    } catch (error) {
      console.error('logout fail');
      throw error;
    }
  }
}

const store = new AuthStore();

export default store;
