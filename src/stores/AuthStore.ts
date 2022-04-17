import Repository from '@repository/Repository';
import { AuthCodeInDto, ConfirmTokenInDto, LoginInDto, LogoutOutDto, UpdatePasswordInDto } from '@src/types';
import { getCookie, removeCookie, setCookie } from '@utils/cookie';
import { makeAutoObservable } from 'mobx';

class AuthStore {
  private issueToken: string;

  private confirmToken: string;

  private isLogin: boolean;

  private email: string;

  constructor() {
    makeAutoObservable(this);

    this.issueToken = '';
    this.isLogin = this.getLogin();
    this.confirmToken = '';
    this.email = '';
  }

  setEmail(email: string) {
    this.email = email;
  }

  getLogin(): boolean {
    if (getCookie('accessToken')) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    return this.isLogin;
  }

  setConfirmToken(token: string) {
    this.confirmToken = token;
  }

  setLogin(status: boolean) {
    this.isLogin = status;
  }

  setAuthCode(code: string) {
    this.issueToken = code;
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

  async sendAuthCode(email: string): Promise<number> {
    try {
      const getAuthCodeDto: AuthCodeInDto = {
        email,
      };

      const result = await Repository.getAuthCode(getAuthCodeDto);
      this.setAuthCode(result.issueToken);
      return result.remainMillisecond;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async verifyAuthCode(email: string, authCode: string) {
    try {
      const postConfirmTokenDto: ConfirmTokenInDto = {
        email,
        authCode,
        issueToken: this.issueToken,
      };

      const result = await Repository.postConfirmToken(postConfirmTokenDto);
      this.setConfirmToken(result.confirmToken);
      this.setEmail(email);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async changePassword(newPassword: string, newPasswordConfirm: string) {
    try {
      const dto: UpdatePasswordInDto = {
        confirmToken: this.confirmToken,
        email: this.email,
        newPassword,
        newPasswordConfirm,
      };
      await Repository.updatePassword(dto);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const store = new AuthStore();

export default store;
