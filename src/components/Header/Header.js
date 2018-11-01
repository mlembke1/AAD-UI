import React, { Component } from 'react';
import './Header.css';
import { connect } from 'react-redux'
import { Navbar, Icon, SideNav, SideNavItem, Button } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/logout'


class Header extends Component {
    render() {
    if (this.props.username) {
        return (
            <Navbar className="navbar-logo" brand={<span className="valign-wrapper sof-aad-header">SOF AAD</span>} right>
                <div onClick={() => this.props.logout()}>
                    <SideNav
                        trigger={
                                <div className="valign-wrapper hamburger-menu-icon-container">
                                    <span className="uppercase">{this.props.firstName} {this.props.lastName}</span>
                                    <Icon className="hamburger">menu</Icon>
                                </div>
                                }
                        options={{ closeOnClick: true, edge: "right" }}
                        >
                        <SideNavItem waves>
                            <Link to="/"> Logout </Link>
                        </SideNavItem>
                    </SideNav>
                </div>
            </Navbar>   
        )
      } else {
        return (
            <Navbar className="navbar-logo" brand={<span className="sof-aad-header valign-wrapper">SOF AAD</span>} right>
                <SideNav
                    trigger={<div className="hamburger-menu-icon-container"><Icon>menu</Icon></div>}
                    options={{ closeOnClick: true, edge: "right" }}
                    >
                    <SideNavItem>
                        <Link className="link" to="/login"> Login </Link>
                    </SideNavItem>
                    <SideNavItem>
                        <Link className="link" to="/signup"> Signup </Link>
                    </SideNavItem>
                </SideNav>
            </Navbar>
        )
      }
    }
  }


const mapStateToProps = state => {
  return {
      username: state.auth.username,
      firstName: state.auth.firstName,
      lastName: state.auth.lastName,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Header)