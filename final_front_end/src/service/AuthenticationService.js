import axios from "axios";

const BASE_URL = `http://localhost:8080/ebanking`;
class AuthenticationService {
  authenticateUser(email, pwd, accType) {
    console.log("auth call", email, pwd, accType);
    return axios.post(`http://localhost:8080/ebanking/auth/signin`, {
      email: email,
      password: pwd,
      accType: accType,
    });
  }

  authenticateAdmin(email, pwd) {
    console.log("auth call", email, pwd);
    return axios.post("http://localhost:8080/ebanking/auth/admin/signin", {
      email: email,
      password: pwd,
    });
  }

  forgotpassword(email){
    console.log("auth call", email);
    return axios.post("http://localhost:8080/ebanking/auth/forgotpassword", {
      email: email
    });
  }

  storeJwt(jwt) {
    sessionStorage.setItem("jwt_token", "Bearer " + jwt);
  }

  storeUserDetails(email, jwt) {
    this.setupRequestInterceptor(jwt);
    this.storeJwt(jwt);
    sessionStorage.setItem("user_email", email);
  }

  storeUserAccounts(accounts) {
    // this.setupRequestInterceptor(jwt);
    sessionStorage.setItem("user_dtls", accounts);
  }

  storeAccountId(accId) {
    sessionStorage.setItem("acc_id", accId);
  }

  removeUserDetails() {
    console.log("rem user");
    sessionStorage.removeItem("user_dtls");
    sessionStorage.removeItem("user_email");
    sessionStorage.removeItem("jwt_token");
    sessionStorage.removeItem("acc_id");
  }

  isUserLoggedIn() {
    console.log("chk user");
    return sessionStorage.getItem("user_email") === null ? false : true;
  }

  getUserName() {
    return sessionStorage.getItem("user_email");
  }

  setupRequestInterceptor(jwt) {
    axios.interceptors.request.use((config) => {
      if (this.isUserLoggedIn()) {
        config.headers.authorization = "Bearer " + jwt;
      }
      return config;
    });
  }
}

export default new AuthenticationService();
