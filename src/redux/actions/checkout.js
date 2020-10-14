/* eslint-disable linebreak-style */
import http from '../../helpers/http';

export default {
  postCheckout: (token) => ({
    type: 'POST_CHECKOUT',
    payload: http(token).post('private/customer/checkout'),
  }),
};
