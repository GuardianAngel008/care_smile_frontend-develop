class AuthService {
  private static isLoggedIn: boolean;
  get isLogged() {
    return AuthService.isLoggedIn;
  }

  setLogin = () => {
    AuthService.isLoggedIn = true;
  };
}
const authClass = new AuthService();
export default authClass;
