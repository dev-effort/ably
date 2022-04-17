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
import APIs from '@utils/Axios';
import { getCookie } from '@utils/cookie';

class Repository {
  public static async postLogin(dto: LoginInDto): Promise<LoginOutDto> {
    const params = new URLSearchParams();
    params.append('email', dto.email);
    params.append('password', dto.password);

    const result = await APIs.post('/login', params);

    return result;
  }

  public static async postLogout(): Promise<LogoutOutDto> {
    const result = await APIs.post('/logout', undefined, {
      headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
    });

    return result;
  }

  public static async getUser(accessToken: string): Promise<UserOutDto> {
    const result = await APIs.get('/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return result;
  }

  public static async getAuthCode(dto: AuthCodeInDto): Promise<AuthCodeOutDto> {
    const result = await APIs.get(`/reset-password?email=${dto.email}`);
    return result;
  }

  public static async postConfirmToken(dto: ConfirmTokenInDto): Promise<ConfirmTokenOutDto> {
    const params = new URLSearchParams();
    params.append('email', dto.email);
    params.append('authCode', dto.authCode);
    params.append('issueToken', dto.issueToken);

    const result = await APIs.post('/reset-password', params);
    return result;
  }

  public static async updatePassword(dto: UpdatePasswordInDto): Promise<UpdatePasswordOutDto> {
    const params = new URLSearchParams();
    params.append('email', dto.email);
    params.append('confirmToken', dto.confirmToken);
    params.append('newPassword', dto.newPassword);
    params.append('newPasswordConfirm', dto.newPasswordConfirm);

    const result = await APIs.patch('/reset-password', params);
    return result;
  }
}

export default Repository;
