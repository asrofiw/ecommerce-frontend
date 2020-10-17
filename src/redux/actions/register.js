import {default as axios} from 'axios';
import qs from 'querystring';
const { REACT_APP_BACKEND_URL } = process.env;

export default {
  createUserCustomer: (data) => ({
    type: 'CREATE_USER_CUSTOMER',
    payload: axios.post(`${REACT_APP_BACKEND_URL}auth/register/customer`, qs.stringify(data)),
  }),
  clearMessageStatus: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};