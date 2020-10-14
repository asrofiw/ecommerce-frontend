import React from 'react';
import {
  Container, Row, Col, Button,
  Form, Input,
  Modal, ModalBody, ModalFooter
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Importing Action
import registerAction from '../redux/actions/register';

// Importing image
import logo from '../assets/images/logo-44px.svg';

class Register extends React.Component {
  state = {
    customer: true,
    seller: false,
    name: '',
    email: '',
    password: ''
  }

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  createRegister = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state
    const data = {
      name,
      email,
      password,
    }
    this.props.postRegister(data);
  }

  buttonToClear = () => {
    this.props.clearMsg();
    if (this.props.register.isSuccess) {
      this.props.history.push('/login')
    }
  }

  onCustomer = () => {
    this.setState({
      customer: true,
      seller: false,
    })
  }

  onSeller = () => {
    this.setState({
      customer: false,
      seller: true,
    })
  }
  
  render() {
    const { isSuccess, isError, alertMsg, statusMsg } = this.props.register
    return (
      <>
        <Container>
          <Row className="vh-100 w-100 m-0 text-center align-items-center">
            <Col>
              <div>
                <img className="mb-3" src={logo} alt="Logo" />
              </div>
              <div className="mb-3">
                <span className="h6 font-weight-bold">Please login with your account</span>
              </div>
              <div className="mb-3">
                <Button onClick={this.onCustomer} outline color="primary" className="bttn border-right-0 rounded-0">Customer</Button>
                <Button onClick={this.onSeller} outline color="primary" className="bttn border-left-0 rounded-0">Seller</Button>
              </div>
              <Row className="align-items-center justify-content-center">
                {this.state.seller && (
                  <Form>
                  <Col className="mb-3">
                    <Input className="form-input mb-2" type="text" onChange={this.changeInput} name="name" placeholder="Name" />
                    <Input className="form-input mb-2" type="email" onChange={this.changeInput} name="email" placeholder="Email" />
                    <Input className="form-input mb-2" type="text" onChange={this.changeInput} name="phone" placeholder="Phone number" />
                    <Input className="form-input mb-2" type="text" onChange={this.changeInput} name="store" placeholder="Store name" />
                    <Input className="form-input mb-2" type="password" onChange={this.changeInput} name="password" placeholder="Password" />
                  </Col>
                  <div>
                    <Button color="primary" className="bg-color form-input rounded-pill" type="submit">
                      Register
                    </Button>
                  </div>
                </Form>
                )}
                {this.state.customer && (
                  <Form onSubmit={this.createRegister}>
                  <Col className="mb-3">
                    <Input className="form-input mb-2" type="text" onChange={this.changeInput} name="name" placeholder="Name" value={this.state.name} />
                    <Input className="form-input mb-2" type="email" onChange={this.changeInput} name="email" placeholder="Email" value={this.state.email} />
                    <Input className="form-input mb-2" type="password" onChange={this.changeInput} name="password" placeholder="Password" value={this.state.password} />
                  </Col>
                  <div>
                    <Button color="primary" className="bg-color form-input rounded-pill" type="submit">
                      Register
                    </Button>
                  </div>
                </Form>
                )}
              </Row>
              <span>
                Already have an account?
                <Link to="/login" className="txt-color text-decoration-none">Login</Link>
              </span>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={isSuccess || isError}>
          <ModalBody>
            <div>{alertMsg}</div>
            <div>{statusMsg}</div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className="bg-color" onClick={this.buttonToClear}>OK</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  register: state.register,
});

const mapDispatchToProps = {
  postRegister: registerAction.createUserCustomer,
  clearMsg: registerAction.clearMessageStatus,
};

export default connect (mapStateToProps, mapDispatchToProps)(Register);
