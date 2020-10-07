/* eslint-disable linebreak-style */
/* eslint-disable import/no-named-default */
import { default as axios } from 'axios';

export default {
  getData: () => ({
    type: 'GET_DATA',
    payload: axios.get('http://localhost:8080/public/items?limit=12'),
  }),
  getDataNewest: () => ({
    type: 'GET_DATA',
    payload: axios.get('http://localhost:8080/public/items?limit=12&sort[update_at]=desc'),
  }),
};
