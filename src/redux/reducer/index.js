/* eslint-disable linebreak-style */
import { combineReducers } from 'redux';

import items from './items';
import auth from './auth';
import cart from './cart';
import checkout from './checkout';
import transaction from './transaction';
import profile from './profile';
import shippingAddress from './shippingAddress';
import register from './register';

export default combineReducers({
  items,
  auth,
  cart,
  checkout,
  transaction,
  profile,
  shippingAddress,
  register,
});
