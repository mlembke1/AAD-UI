import React, { Component } from 'react';
import './Header.css';
import { connect } from 'react-redux'
import { Navbar } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/logout'


class Header extends Component {
    
    render() {
    const Img = 
    <div className="valign-wrapper">
        <img src={require("../../assets/aad_logo.png")} className="aad_logo font-thin" width="40px"  /> <span>SOF AAD</span>
    </div>
    if (this.props.username || this.props.toDash) {
        return (
            <Navbar className="navbar-logo" brand={Img} right>
                <div onClick={() => this.props.logout()}>
                    <Link to="/"> Logout </Link>
                </div>
            </Navbar>   
        )
      } else {
        return (
            <Navbar className="navbar-logo" brand={Img} right>
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