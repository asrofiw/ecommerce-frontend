import { default as axios } from 'axios';
const { REACT_APP_BACKEND_URL } = process.env;

export default {
  getData: () => ({
    type: 'GET_DATA',
    payload: axios.get(`${REACT_APP_BACKEND_URL}public/items?limit=12`),
  }),
  getDataNewest: () => ({
    type: 'GET_DATA_NEWEST',
    payload: axios.get(`${REACT_APP_BACKEND_URL}public/items?limit=12&sort[update_at]=desc`),
  }),
  getDataDetail: (id) => ({
    type: 'GET_DATA_DETAIL',
    payload: axios.get(`${REACT_APP_BACKEND_URL}public/items/${id}`),
  }),
};
