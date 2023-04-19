import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {

  login(userEmail,  userPassword) {
    return axios
      .post(API_URL + "signin", {
        email: userEmail,
        password: userPassword
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(uname, uemail, uphone, upassword, r) {
    let payload = [r];
    return axios.post(API_URL + "signup", {
      name: uname,
      email: uemail,
      phone: uphone,
      password: upassword,
      role: payload
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
