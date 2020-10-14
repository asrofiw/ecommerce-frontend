import qs from 'querystring';
import http from '../../helpers/http';

export default {
  postTransaction: (token, data) => ({
    type: 'POST_TRANSACTION',
    payload: http(token).post('private/customer/transaction', qs.stringify(data)),
  }),
  clearMessageStatus: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
