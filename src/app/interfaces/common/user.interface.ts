export interface User {
  _id?: string;
  name?: string;
  username?: string;
  phone?: string;
  email?: string;
  phoneNo?: string;
  password?: string;
  gender?: string;
  registrationType?: string;
  profileImg?: string;
  joinDate?: string;
  occupation?: string;
  hasAccess?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserAuthResponse {
  success: boolean;
  token?: string;
  tokenExpiredInDays?: string;
  data?: any;
  message?: string;
}

export interface UserJwtPayload {
  _id?: string;
  username: string;
}
