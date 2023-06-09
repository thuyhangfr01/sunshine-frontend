import axios from "axios";

export default axios.create({
    // baseURL: "http://localhost:8080/api",
    baseURL: "https://sunshine-backend.azurewebsites.net/api",
    headers: {
        "Content-Type": "application/json"
    }
})