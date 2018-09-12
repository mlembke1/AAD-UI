import React, { Component } from 'react';
import './Header.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Navbar, NavItem } from 'react-materialize'


class Header extends Component {

  render() {
    if (this.props.username) {
        return (
            <Navbar className="navbar-logo" brand='aad' right>
                <NavItem> Logout </NavItem>
            </Navbar>   
        )
      } else {
        return (
            <Navbar className="navbar-logo" brand='aad' right>
                <NavItem id="login"> Login </NavItem>
                <NavItem> Signup </NavItem>
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