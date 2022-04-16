export type LoginInDto = {
  email: string;
  password: string;
};

export type LoginOutDto = {
  accessToken: string;
};

export type LogoutOutDto = {
  lastConnectedAt: Date;
};

export type UserOutDto = {
  name: string;
  email: string;
  profileImage: string;
  lastConnectedAt: Date;
};

export type AuthCodeInDto = {
  email: string;
};

export type AuthCodeOutDto = {
  issueToken: string;
  remainMillisecond: number;
};

export type ConfirmTokenInDto = {
  email: string;
  authCode: string;
  issueToken: string;
};

export type ConfirmTokenOutDto = {
  confirmToken: string;
};

export type UpdatePasswordInDto = {
  email: string;
  confirmToken: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export type UpdatePasswordOutDto = {
  email: string;
};
