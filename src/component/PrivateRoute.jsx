/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
  render() {
    const token = localStorage.getItem('token')
    console.log(token)
    return (
      <Route render={
        (props) => {
          const childWithProps = React.Children.map(this.props.children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, props);
            }
            return child;
          });
          if (this.props.auth.isLogin || token) {
            return childWithProps;
          }
          return <Redirect to={{ pathname: '/login'}} />;
        }
      }
      />
    );
  }
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(PrivateRoute);
