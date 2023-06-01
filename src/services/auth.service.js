import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

  const login = (userEmail,  userPassword) => {
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

  const logout= () => {
    localStorage.removeItem("user");
    localStorage.removeItem("persist:root");
  }

  const removePersistRoot = () => {
    localStorage.removeItem("persist:root");
  }

  const register = (uname, uemail, uphone, upassword) => {
    return axios.post(API_URL + "signup", {
      name: uname,
      email: uemail,
      phone: uphone,
      password: upassword,
    });
  }

  // const getCurrentUser = () => {
  //   return JSON.parse(localStorage.getItem('user'));;
  // }

  const authService = {
    register,
    login,
    logout,
    removePersistRoot
  }

export default authService;
