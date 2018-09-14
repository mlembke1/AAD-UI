import React, { Component } from 'react';
import './Header.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Navbar, NavItem } from 'react-materialize'
import App from '../../App';
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import { Link, Route } from 'react-router-dom'


class Header extends Component {

  render() {
    if (this.props.username) {
        return (
            <Navbar className="navbar-logo" brand='aad' right>
                <Link to="/"> Logout </Link>
                <Route exact path="/" component={App}/>                  
            </Navbar>   
        )
      } else {
        return (
            <Navbar className="navbar-logo" brand='aad' right>
                <Link className="link" to="/login"> Login </Link>
                <Link className="link" to="/signup"> Signup </Link>
                <Route exact path="/login" component={Login}/>                  
                <Route exact path="/signup" component={Signup}/>                  
            </Navbar>
        )
      }
    }
  }



const mapStateToProps = state => {
  return {
      username: state.auth.username,
  }
}

// const mapDispatchToProps = dispatch => bindActionCreators({checkCookie}, dispatch)

export default connect(mapStateToProps, null)(Header)