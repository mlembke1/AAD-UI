import React, { Component } from 'react';
import './Header.css';
import { connect } from 'react-redux'
import { Navbar } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/logout'


class Header extends Component {

  render() {
    if (this.props.username || this.props.toDash) {
        return (
            <Navbar className="navbar-logo" brand='aad' right>
                <div onClick={() => this.props.logout()}>
                    <Link to="/"> Logout </Link>
                </div>
            </Navbar>   
        )
      } else {
        return (
            <Navbar className="navbar-logo" brand='aad' right>
                <Link className="link" to="/login"> Login </Link>
                <Link className="link" to="/signup"> Signup </Link>
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

const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Header)