/* eslint-disable linebreak-style */
import qs from 'querystring';
import http from '../../helpers/http';

export default {
  login: (data) => ({
    type: 'AUTH_USER',
    payload: http().post('auth/login', qs.stringify(data)),
  }),
  logout: () => ({
    type: 'LOGOUT_USER',
  }),
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
