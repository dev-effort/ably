import {
  AuthCodeInDto,
  AuthCodeOutDto,
  ConfirmTokenInDto,
  ConfirmTokenOutDto,
  LoginInDto,
  LoginOutDto,
  LogoutOutDto,
  UpdatePasswordInDto,
  UpdatePasswordOutDto,
  UserOutDto,
} from '@src/types';
import Axios from '@utils/Axios';
import { getCookie } from '@utils/cookie';

class Repository {
  API: Axios;

  constructor() {
    this.API = new Axios();
  }

  async postLogin(dto: LoginInDto): Promise<LoginOutDto> {
    const params = new URLSearchParams();
    params.append('email', dto.email);
    params.append('password', dto.password);

    const result = await this.API.post('/login', params);

    return result;
  }

  async postLogout(): Promise<LogoutOutDto> {
    const result = await this.API.post('/logout', undefined, {
      headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
    });

    return result;
  }

  async getUser(): Promise<UserOutDto> {
    const result = await this.API.get('/user', {
      headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
    });

    return result;
  }

  async getAuthCode(dto: AuthCodeInDto): Promise<AuthCodeOutDto> {
    const result = await this.API.get(`/reset-password?email=${dto.email}`);
    return result;
  }

  async postConfirmToken(dto: ConfirmTokenInDto): Promise<ConfirmTokenOutDto> {
    const params = new URLSearchParams();
    params.append('email', dto.email);
    params.append('authCode', dto.authCode);
    params.append('issueToken', dto.issueToken);

    const result = await this.API.post('/reset-password', params);
    return result;
  }

  async updatePassword(dto: UpdatePasswordInDto): Promise<UpdatePasswordOutDto> {
    const params = new URLSearchParams();
    params.append('email', dto.email);
    params.append('confirmToken', dto.confirmToken);
    params.append('newPassword', dto.newPassword);
    params.append('newPasswordConfirm', dto.newPasswordConfirm);

    const result = await this.API.patch('/reset-password', params);
    return result;
  }
}

export default new Repository();
