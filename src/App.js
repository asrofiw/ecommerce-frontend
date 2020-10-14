/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

// Importing Component
import PrivateRoute from './component/PrivateRoute';

// Importing pages
import ItemProduct from './pages/ItemProduct';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddItem from './pages/AddItem';
import DetailProduct from './pages/DetailProduct';
import ItemCategory from './pages/ItemCategory';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';

// Import store
import store from './redux/store';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/item" component={DetailProduct} />
        <Route path="/admin" component={ItemProduct} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/add-item" component={AddItem} />
        <Route path="/category" component={ItemCategory} exact />
        <PrivateRoute path="/cart">
          <Cart />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/checkout">
          <Checkout />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
