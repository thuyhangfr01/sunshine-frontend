import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/auth/';

const getAdminBoard = () => {
  return axios.get(API_URL + 'admin', { headers: authHeader() });
}

const getCollaboratorBoard = () => {
  return axios.get(API_URL + 'collaborator', { headers: authHeader() });
}

const getRecipientBoard = () => {
  return axios.get(API_URL + 'recipient', { headers: authHeader() });
}

const getBenefactorBoard = () => {
  return axios.get(API_URL + 'benefactor', { headers: authHeader() });
}

const userService = {
  getAdminBoard,
  getCollaboratorBoard,
  getRecipientBoard,
  getBenefactorBoard
}

export default userService;
