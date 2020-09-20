import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Form, Input, Button, Container,
  Row, Col
} from 'reactstrap'

// Importing image
import logo from '../assets/images/logo-44px.svg'

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      linkToHome: null
    }
  }

  dataAdmin = {
    email: 'admin@mail.com',
    password: 'admin'
  }

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  loginClick = () => {
    if ( this.state.email === this.dataAdmin.email && this.state.password === this.dataAdmin.password){
      return(
        this.setState({
          linkToHome: '/'
        })
      )
    } else{
      console.log("error")
    }
  }

  render(){

    return(
      <React.Fragment>
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
                    <Input className="form-input mb-2" type="email" value={this.state.email} onChange={this.changeInput} name="email" placeholder="Email" />
                    <Input className="form-input mb-2" type="password" value={this.state.password} onChange={this.changeInput} name="password" placeholder="Password" />
                    <div className="text-right">
                      <Link to="#" className="txt-color text-decoration-none">Forgot password?</Link>
                    </div>
                  </Col>
                  <div>
                  <Button color="primary" className="bg-color form-input rounded-pill" type="submit" onClick={this.loginClick}>
                    <Link to="/"></Link>Login</Button>
                  </div>
                </Form>
              </Row>
              <span>Don't have an account?<Link to="/register" className="txt-color text-decoration-none">Register</Link></span>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default Login