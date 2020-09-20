import React from 'react'
import {Navbar, Container,
  NavbarBrand, Collapse, NavbarToggler, 
  Nav, NavItem, Input, Button
} from 'reactstrap'
import {Link} from 'react-router-dom'

// Importing images
import logo from '../assets/images/logo-44px.svg'
import search from '../assets/images/search.svg'
import filter from '../assets/images/filter.svg'
import cart from '../assets/images/cart.svg'
import bell from '../assets/images/bell.svg'
import mail from '../assets/images/mail.svg'
import profile from '../assets/images/profile.jpg'


class NavBar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      navbarOpen: false
    }
  }


  render(){
    return(
      <Navbar color="light" light expand="md" className="sticky-top shadow py-3 mb-5">
        <Container>
          <NavbarBrand>
            <Link to='/'>
              <img src={logo} alt='Home' className="mr-3"/>
            </Link>
          </NavbarBrand>
          <NavbarToggler className="border-0" onClick={()=> this.setState({navbarOpen: !this.state.navbarOpen})}/>
          <Collapse navbar isOpen={this.state.navbarOpen} >
            <Nav navbar >
              <div>
                <NavItem >
                  <Input
                    type="search"
                    name="search"
                    id="exampleSearch"
                    placeholder="Search"
                    className="position-relative rounded-pill px-4 relative search"
                  />
                </NavItem>
                <NavItem>
                  <Button className="bg-transparent border-0 p-0 btn-logo-search position-absolute">
                  <img src={search} alt="search" ></img>
                  </Button>
                </NavItem>
              </div>
              <NavItem>
                <Button className="bg-transparent border-0 p-0 ml-5">
                    <img src={filter} alt="filter" ></img>
                </Button>
              </NavItem>
            </Nav>
            <Nav navbar className="ml-auto">
              <NavItem>
                <Button className="bg-transparent border-0 p-0 mr-5">
                    <img src={cart} className="" alt="cart"></img>
                </Button>
              </NavItem>
              <NavItem>
                <Button className="bg-transparent border-0 p-0 mr-5">
                    <img src={bell} className="rounded-circle" alt="notifications"></img>
                </Button>
              </NavItem>
              <NavItem>
                <Button className="bg-transparent border-0 p-0 mr-5">
                    <img src={mail} className="rounded-circle" alt="mail"></img>
                </Button>
              </NavItem>
              <NavItem>
                <Button className="profile bg-transparent border-0 p-0 mr-3">
                    <img src={profile} className="img-profile rounded-circle" alt="profile"></img>
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default NavBar
