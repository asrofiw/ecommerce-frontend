import React from 'react';
import {
  Container, Row, Col, Button,
  Form, Input,
} from 'reactstrap';
import { Link } from 'react-router-dom';

// Importing image
import logo from '../assets/images/logo-44px.svg';

class Register extends React.Component {
  
  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  
  render() {
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
                <Button outline color="primary" className="bttn border-right-0 rounded-0">Customer</Button>
                <Button outline color="primary" className="bttn border-left-0 rounded-0">Seller</Button>
              </div>
              <Row className="align-items-center justify-content-center">
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
              </Row>
              <span>
                Already have an account?
                <Link to="/login" className="txt-color text-decoration-none">Login</Link>
              </span>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Register;
