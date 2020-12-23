export interface User {
  isLogged: boolean;
  userData: {
    jwt: string;
    username: string;
    expireTime: number;
  };
}
