import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/info/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getCollaboratorBoard() {
    return axios.get(API_URL + 'collaborator', { headers: authHeader() });
  }

  getRecipientBoard() {
    return axios.get(API_URL + 'recipient', { headers: authHeader() });
  }

  getBenefactorBoard() {
    return axios.get(API_URL + 'benefactor', { headers: authHeader() });
  }
}

export default new UserService();
