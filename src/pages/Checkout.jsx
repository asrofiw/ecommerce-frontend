/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Container, Row, Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input,
} from 'reactstrap';

// Import Action
import checkoutAction from '../redux/actions/checkout';
import transactionAction from '../redux/actions/transaction';

// Import Component
import NavBar from '../component/NavBar';

const Checkout = (props) => {
  const {
    className,
  } = props;
  const token = localStorage.getItem('token')
  const checkout = useSelector((state) => state.checkout);
  const transaction = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkoutAction.postCheckout(token));
  }, [dispatch, token]);

  const [modalAddress, setModalAddress] = useState(false);
  const [modalNewAddress, setModalNewAddress] = useState(false);
  const [modalPayment, setModalPayment] = useState(false);
  const [payment, setPayment] = useState('');

  const toggleAddress = () => setModalAddress(!modalAddress);
  const toggleNewAddress = () => setModalNewAddress(!modalNewAddress);
  const togglePayment = () => setModalPayment(!modalPayment);

  const createTransaction = () => {
    dispatch(transactionAction.postTransaction(token, { paymentMethod: payment }));
  };

  const closeMsg = () => {
    dispatch(transactionAction.clearMessageStatus());
  };

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    const { value } = e.target;
    if (isChecked) {
      setPayment(value);
    }
  };

  return (
    <>
      <NavBar />
      <Container>
        <div>
          <h3 className="font-weight-bold mb-5">Checkout</h3>
        </div>
        <div>
          <Row xs={1} md={2}>
            <Col>
              <div className="mb-3">
                <h5>Shipping Address</h5>
              </div>
              <div className="checkout-address d-flex flex-column justify-content-between text-left shadow rounded border mb-4 p-4">
                <div className="font-weight-bold">
                  <span>Nama</span>
                </div>
                <div>
                  <address className="text-left">
                    Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181
                  </address>
                </div>
                <Button onClick={toggleAddress} color="outline-secondary" className="address-btn rounded-pill text-sm p-0">Choose another address</Button>
              </div>

              {checkout.dataCheckout.length && checkout.dataCheckout.map((e) => (
                <div className="cart-item d-flex align-items-center justify-content-between text-center shadow rounded border mb-4 px-4">
                  <div className="d-flex align-items-center">
                    <div className="wrapper-thumb-cart rounded mr-4">
                      <img className="thumbnail-cart rounded" src={e.image} alt={e.item} />
                    </div>
                    <div className="text-left">
                      <div className="font-weight-bold">
                        <span>{e.item}</span>
                      </div>
                      <div className="text-muted">
                        <span>Zalora Cloth</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-weight-bold">
                    <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(e.total)}</span>
                  </div>
                </div>
              ))}
            </Col>
            <Col md={{ size: 4, offset: 2 }}>
              <div className="checkout-summary d-flex flex-column justify-content-between shadow rounded border p-3">
                <div>
                  <h4>Shopping summary</h4>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <span>Order</span>
                  </div>
                  <div className="font-weight-bold">
                    <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(checkout.summary)}</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <span>Delivery</span>
                  </div>
                  <div className="font-weight-bold">
                    <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(checkout.deliveryFee)}</span>
                  </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <div>
                    <span>Shopping summary</span>
                  </div>
                  <div className="font-weight-bold txt-color">
                    <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(checkout.summary + checkout.deliveryFee)}</span>
                  </div>
                </div>
                <Button onClick={togglePayment} color="primary" className="rounded-pill txt-sm bg-color" block>Select payment</Button>
              </div>
            </Col>
          </Row>
        </div>

        <div>
          <Modal isOpen={modalAddress} fade={false} toggle={toggleAddress} size="lg" className="text-center" centered>
            <ModalHeader toggle={toggleAddress}>
              <div className="d-flex flex-column text-center">
                <span>Choose Another Address</span>
              </div>
            </ModalHeader>
            <ModalBody>
              <Button onClick={toggleNewAddress} color="outline-secondary" className="add-address txt-sm shadow rounded mb-4 p-4" block>Add new address</Button>
              <div className="d-flex flex-column justify-content-between text-left shadow rounded border mb-4 p-4">
                <div className="font-weight-bold">
                  <span>Nama</span>
                </div>
                <div>
                  <address className="text-left">
                    Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181
                  </address>
                </div>
                <Button onClick={toggleAddress} color="outline-secondary" className="address-btn rounded-pill text-sm p-0">Change address</Button>
              </div>
            </ModalBody>
          </Modal>
        </div>

        <div>
          <Modal isOpen={modalNewAddress} fade={false} toggle={toggleNewAddress} size="lg" className={className} centered>
            <ModalHeader toggle={toggleNewAddress}>Add new address</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="addressAs" className="text-muted txt-sm">Save address as (ex : home address, office address)</Label>
                  <Input type="text" name="addressAs" id="addressAs" placeholder="Home" className="txt-sm" />
                </FormGroup>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="recipientsName" className="text-muted txt-sm">Recipients&apos;s name</Label>
                      <Input type="text" name="recipientsName" id="recipientsName" className="txt-sm" />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="recipientsPhone" className="text-muted txt-sm">Recipients&apos;s telephone number</Label>
                      <Input type="text" name="recipientsPhone" id="recipientsPhone" className="txt-sm" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="address" className="text-muted txt-sm">Address</Label>
                      <Input type="text" name="address" id="address" className="txt-sm" />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="postalCode" className="text-muted txt-sm">Postal code</Label>
                      <Input type="text" name="postalCode" id="postalCode" className="txt-sm" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="city" className="text-muted txt-sm">City</Label>
                      <Input type="text" name="city" id="city" className="txt-sm" />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup check>
                  <Input type="checkbox" name="primaryAddress" id="primaryAddress" />
                  <Label for="primaryAddress" className="text-muted txt-sm" check>Make it the primary address</Label>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="outline-primary" onClick={toggleNewAddress} className="add-address-btn rounded-pill txt-sm">Cancel</Button>
              {' '}
              <Button color="primary" onClick={toggleNewAddress} className="add-address-btn bg-color rounded-pill txt-sm">Save</Button>
            </ModalFooter>
          </Modal>
        </div>

        <div>
          <Modal isOpen={modalPayment} fade={false} toggle={togglePayment} className="h-75" centered>
            <ModalHeader toggle={togglePayment}>Payment</ModalHeader>
            <ModalBody>
              <FormGroup check className="d-flex justify-content-between">
                <img src="#" alt="logoPayment" className="logo-payment" />
                <Label for="paymentMethod" className="font-weight-bold txt-sm" check>BLANJAPAY</Label>
                <div>
                  <Input onChange={handleChange} type="checkbox" name="paymentMethod" id="paymentMethod" value="Blanjapay" />
                </div>
              </FormGroup>
              <hr />
              <div>
                <span className="font-weight-bold">Shopping summary</span>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <span>Order</span>
                </div>
                <div className="font-weight-bold">
                  <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(checkout.summary)}</span>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <span>Delivery</span>
                </div>
                <div className="font-weight-bold">
                  <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(checkout.deliveryFee)}</span>
                </div>
              </div>
              <Modal fade={false} isOpen={transaction.isSuccess || transaction.isError} toggle={togglePayment}>
                <ModalHeader>{transaction.statusMsg}</ModalHeader>
                <ModalBody>{transaction.alertMsg}</ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={closeMsg}>Close</Button>
                </ModalFooter>
              </Modal>
            </ModalBody>
            <ModalFooter className="d-flex justify-content-between align-items-center shadow">
              <div>
                <Col>
                  <span className="font-weight-bold">Shopping summary</span>
                </Col>
                <Col>
                  <span className="txt-color font-weight-bold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(checkout.summary + checkout.deliveryFee)}</span>
                </Col>
              </div>
              <Button color="primary" onClick={createTransaction} className="add-address-btn txt-sm rounded-pill bg-color">Buy</Button>
            </ModalFooter>
          </Modal>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
