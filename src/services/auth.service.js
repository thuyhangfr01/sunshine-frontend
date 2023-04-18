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

  register(name, email, phone, password) {
    return axios.post(API_URL + "signup", {
      name,
      email,
      phone,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
