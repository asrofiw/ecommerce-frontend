import React from 'react';
import {
  Col, Container, Row, Button,
  Modal, ModalBody, ModalFooter
} from 'reactstrap';
import { connect } from 'react-redux';

// Import Action
import itemsAction from '../redux/actions/items';
import cartAction from '../redux/actions/cart'

// Import Component
import ItemUpdated from '../component/ItemUpdated';
import NavBar from '../component/NavBar';

// Import image
import noImage from '../assets/images/no_img.png'
import rating from '../assets/images/star-activated.svg';

class DetailProduct extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token')
    let path = this.props.location.pathname;
    path = path.split('/');
    const id = path[path.length - 1];
    this.state = {
      idItem: id,
      quantity: 1,
      token: token,
      modalOpen: false,
    };
  }

  async componentDidMount() {
    await this.props.getDataDetail(this.state.idItem);
  }

  increment = () => {
    this.setState({
      quantity: this.state.quantity + 1,
    });
  }

  decrement = () => {
    this.setState({
      quantity: this.state.quantity - 1,
    });
    if (this.state.quantity === 1) {
      return this.setState({
        quantity: 1,
      });
    }
  }

  clearMsg = () => {
    this.props.clearMessage()
  }

  toggleModal = () => {
    this.setState({
      modalOpen: true
    })
  }

  addCart = async (e) => {
    e.preventDefault()
    const { idItem, quantity } = this.state
    const data = {
      idItem,
      quantity,
    }
    await this.props.postCart(this.state.token, data)
    this.toggleModal()
  }

  render() {
    const {
      dataDetail, urlImage,
    } = this.props.items;
    console.log(this.props.cart)
    return (
      <>
        <NavBar />
        <div className="mb-5">
          <Container>
            <span className="text-muted">
              Home &gt;
              {dataDetail.category}
              {' '}
              &gt;
              {dataDetail.sub_category}
            </span>
          </Container>
        </div>
        <div className="mb-5">
          <Container>
            <Row xs={1} md={2}>
              <Col md={4}>
                <div className="detail-img">
                  <Row>
                    <div className="top-img rounded border p-0 mb-3">
                      <img className="top-img" src={urlImage? urlImage[0] : noImage} alt="top-img" />
                    </div>
                  </Row>
                  <Row className="justify-content-center">
                    {urlImage && urlImage.length && urlImage.map(item => (
                      <div className="thumbnail-img rounded bg-success p-0">
                        <img className="thumbnail-img" src={item} alt="thumbnail-img" />
                      </div>
                    ))}
                    {!urlImage && (
                      <div className="thumbnail-img rounded p-0">
                      </div>
                    )}
                  </Row>
                </div>
              </Col>

              <Col md={8}>
                <div>
                  <h3>{dataDetail.name}</h3>
                </div>
                <div className="text-muted">
                  <span>Zalora Cloth</span>
                </div>
                <div className="mb-4">
                  <img src={rating} alt="rating" />
                  <img src={rating} alt="rating" />
                  <img src={rating} alt="rating" />
                  <img src={rating} alt="rating" />
                  <img className="mr-1" src={rating} alt="rating" />
                  <span className="txt-2 text-muted">(10)</span>
                </div>
                <div className="text-muted">
                  <span>Price</span>
                </div>
                <div>
                  <h3 className="font-weight-bold mb-4">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(dataDetail.price)}</h3>
                </div>
                <div className="mb-2">
                  <span>Color</span>
                </div>
                <div className="mb-4">
                  <Row>
                    <div className="container-color-btn">
                      <Button color="dark" className="color-btn rounded-circle p-0" />
                    </div>
                    <div className="container-color-btn">
                      <Button color="success" className="color-btn rounded-circle p-0" />
                    </div>
                    <div className="container-color-btn">
                      <Button color="danger" className="color-btn rounded-circle p-0" />
                    </div>
                    <div className="container-color-btn">
                      <Button color="primary" className="color-btn rounded-circle p-0" />
                    </div>
                  </Row>
                </div>
                <div className="mb-5">
                  <Row>
                    <Col md={3}>
                      <div className="font-weight-bold mb-2">
                        <span>Size</span>
                      </div>
                      <Row className="align-items-center">
                        <div className="container-color-btn">
                          <Button color="secondary" className="color-btn rounded-circle p-0">-</Button>
                        </div>
                        <div>
                          <span>1</span>
                        </div>
                        <div className="container-color-btn">
                          <Button color="outline-secondary" className="color-btn rounded-circle p-0">+</Button>
                        </div>
                      </Row>
                    </Col>
                    <Col md={3}>
                      <div className="font-weight-bold mb-2">
                        <span>Jumlah</span>
                      </div>
                      <Row className="align-items-center">
                        <div className="container-color-btn">
                          <Button onClick={this.decrement} color="secondary" className="color-btn rounded-circle p-0">-</Button>
                        </div>
                        <div>
                          <span>{this.state.quantity}</span>
                        </div>
                        <div className="container-color-btn">
                          <Button onClick={this.increment} color="outline-secondary" className="color-btn rounded-circle p-0">+</Button>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Button color="outline-primary" className="sec-btn rounded-pill">Chat</Button>
                    <Button onClick={this.addCart} color="outline-primary" className="sec-btn rounded-pill">Add Cart</Button>
                    <Button color="primary" className="pri-btn w-50 rounded-pill bg-color">Buy Now</Button>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div>
          <Container>
            <div className="mb-5">
              <h2 className="font-weight-bold">Informasi Produk</h2>
            </div>
            <div className="mb-2">
              <div>
                <h3 className="font-weight-bold">Condition</h3>
              </div>
              <div className="text-primary mb-5">
                <h5>New</h5>
              </div>
            </div>
            <div>
              <div>
                <h3 className="font-weight-bold">Description</h3>
              </div>
              <div className="text-muted text-justify mb-5">
                <p>
                  {dataDetail.description}
                </p>
              </div>
            </div>
            <div>
              <div>
                <h3 className="font-weight-bold">Prduct Review</h3>
              </div>
              <Row md={5} className="align-items-center mb-5">
                <Col>
                  <div>
                    <span className="parent-rating">5.0</span>
                    <span className="text-muted">/ 5.0</span>
                  </div>
                  <div>
                    <img className="mr-2" src={rating} alt="rating" />
                    <img className="mr-2" src={rating} alt="rating" />
                    <img className="mr-2" src={rating} alt="rating" />
                    <img className="mr-2" src={rating} alt="rating" />
                    <img className="mr-2" src={rating} alt="rating" />
                  </div>
                </Col>
                <Col>
                  <Row className="align-items-center">
                    <img className="mr-3" src={rating} alt="rating" />
                    <div className="mr-2">
                      <span>5</span>
                    </div>
                    <div className="rating-meter rounded-pill bg-color mr-2"></div>
                    <div>
                      <span>4</span>
                    </div>
                  </Row>
                  <Row className="align-items-center">
                    <img className="mr-3" src={rating} alt="rating" />
                    <div className="mr-2">
                      <span>4</span>
                    </div>
                    <div className="rating-meter rounded-pill mr-2"></div>
                    <div>
                      <span>0</span>
                    </div>
                  </Row>
                  <Row className="align-items-center">
                    <img className="mr-3" src={rating} alt="rating" />
                    <div className="mr-2">
                      <span>3</span>
                    </div>
                    <div className="rating-meter rounded-pill mr-2"></div>
                    <div>
                      <span>0</span>
                    </div>
                  </Row>
                  <Row className="align-items-center">
                    <img className="mr-3" src={rating} alt="rating" />
                    <div className="mr-2">
                      <span>2</span>
                    </div>
                    <div className="rating-meter rounded-pill mr-2"></div>
                    <div>
                      <span>0</span>
                    </div>
                  </Row>
                  <Row className="align-items-center">
                    <img className="mr-3" src={rating} alt="rating" />
                    <div className="mr-2">
                      <span>1</span>
                    </div>
                    <div className="rating-meter rounded-pill mr-2"></div>
                    <div>
                      <span>0</span>
                    </div>
                  </Row>
                </Col>
              </Row>
            </div>
            <hr />
          </Container>
        </div>
        <div className="my-5">
          <ItemUpdated title="You can also like this" />
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalBody>{this.props.cart.alertMsg}</ModalBody>
          <ModalFooter>
            <Button color="primary" className="bg-color" onClick={() => this.setState({modalOpen: false})}>OK</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  items: state.items,
  cart: state.cart,
});

const mapDispatchToProps = {
  getDataDetail: itemsAction.getDataDetail,
  postCart: cartAction.postCart,
  clearMessage: cartAction.clearMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);
