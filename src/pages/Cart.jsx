/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import {
  Col, Container, Row, Input, Button,
  FormGroup, Label,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Import action
import cartAction from '../redux/actions/cart';
import checkoutAction from '../redux/actions/checkout';

// Import Component
import NavBar from '../component/NavBar';

// import images
import noImage from '../assets/images/no_img.png';

const Cart = () => {
  const token = localStorage.getItem('token');
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartAction.getCart(token));
  }, [dispatch, token]);
  const onBuyCheckout = () => {
    dispatch(checkoutAction.postCheckout(token));
  };
  console.log(cart)

  return (
    <>
      <NavBar />
      <Container>
        <div>
          <h3 className="font-weight-bold mb-5">My Cart</h3>
        </div>
        <div>
          <Row xs={1} md={2}>
            <Col>
              <div className="cart-select d-flex align-items-center justify-content-between text-center shadow rounded border mb-4 px-4">
                <div>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" />
                      <span className="font-weight-bold">Select all item(s) </span>
                      <span className="text-muted">(2 item(s) selected)</span>
                    </Label>
                  </FormGroup>
                </div>
                <div>
                  <Button color="link" className="txt-color text-decoration-none font-weight-bold p-0">Delete</Button>
                </div>
              </div>
              {cart.dataCart && cart.dataCart.length && cart.dataCart.map((e) => (
                <div className="cart-item d-flex align-items-center justify-content-between text-center shadow rounded border mb-4 px-4">
                  <div className="d-flex flex-column">
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" value={e.id} name={e.item} />
                      </Label>
                    </FormGroup>
                  </div>
                  <div className="wrapper-thumb-cart rounded">
                    <img className="thumbnail-cart rounded" src={e.image? e.image : noImage} alt={e.item} />
                  </div>
                  <div className="text-left">
                    <div className="font-weight-bold mb-2">
                      <span>{e.item}</span>
                    </div>
                    <div className="text-muted">
                      <span>Zalora Cloth</span>
                    </div>
                  </div>
                  <div>
                    <Row className="align-items-center">
                      <div className="font-weight-bold">
                        <span>{e.quantity}</span>
                      </div>
                    </Row>
                  </div>
                  <div className="font-weight-bold">
                    <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(e.total)}</span>
                  </div>
                </div>
              ))}
              {cart.isLoading && !cart.isError && (
              <div>Loading</div>
              )}
              {cart.isError && cart.alertMsg !== '' && (
                <div>{cart.alertMsg}</div>
              )}
            </Col>

            <Col md={{ size: 4, offset: 2 }}>
              <div className="cart-summary d-flex flex-column justify-content-between shadow rounded border p-3">
                <div>
                  <h4>Shopping summary</h4>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <span>Total price</span>
                  </div>
                  <div className="font-weight-bold">
                    <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(cart.summary)}</span>
                  </div>
                </div>
                <Link to="/checkout">
                  <Button onClick={onBuyCheckout} color="primary" className="rounded-pill bg-color" block>Buy</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Cart;
