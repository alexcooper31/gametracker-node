interface IUserLoginCredentials {
  email: string;
  password: string;
}

interface IUserCreationParameters {
  email: string;
  password: string;
}

interface IUserPayload {
  id: string;
  email: string;
}

interface IUserJWT<UserPayload = IUserPayload> {
  exp: number;
  iat: number;
  user: UserPayload;
}

export {
  IUserCreationParameters,
  IUserLoginCredentials,
  IUserJWT,
  IUserPayload,
};
