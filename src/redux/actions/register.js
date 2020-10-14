import {default as axios} from 'axios';
import qs from 'querystring';

export default {
  createUserCustomer: (data) => ({
    type: 'CREATE_USER_CUSTOMER',
    payload: axios.post('http://localhost:8080/auth/register/customer', qs.stringify(data)),
  }),
  clearMessageStatus: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};