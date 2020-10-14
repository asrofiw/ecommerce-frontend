/* eslint-disable linebreak-style */
import qs from 'querystring';
import http from '../../helpers/http';

export default {
  postCart: (token, data) => ({
    type: 'POST_CART',
    payload: http(token).post('private/customer/cart', qs.stringify(data)),
  }),
  getCart: (token) => ({
    type: 'GET_CART',
    payload: http(token).get('private/customer/cart'),
  }),
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE'
  })
};
