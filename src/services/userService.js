import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/v1/auth/login', {email: userEmail, password: userPassword})
}

export { handleLoginApi }