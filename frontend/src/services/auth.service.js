import api from "./api.service";

class AuthService {
  login(email, password) {
    return api
      .post("auth/sign_in", {email, password})
      .then((response) => {
        if (response.headers["access-token"]) {
          let user = response.data.data
          user.accessToken = response.headers["access-token"];
          user.client = response.headers["client"];

          localStorage.setItem("user", JSON.stringify(user));
        }

        return response.data;
      });
  }

  logout() {
    debugger
    localStorage.removeItem("user");
  }
}

export default new AuthService();
