import http from '../../helpers/http';

export default {
  getProfile: (token) => ({
    type: 'GET_PROFILE',
    payload: http(token).get('private/customer/profile'),
  }),
  updateProfile: (token, data) => ({
    type: 'UPDATE_PROFILE',
    payload: http(token).patch('private/customer/profile', data)
  }),
  clearMessageStatus: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};