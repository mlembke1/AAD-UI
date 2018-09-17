import React, { Component } from 'react';
import './LandingPage.css';
import { connect } from 'react-redux'
import { Button } from 'react-materialize'
import { Link } from 'react-router-dom'
import { Redirect, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'

class LandingPage extends Component {

  render() {
    // if(this.props.username || this.props.toDash){
    //   return (
    //       <Redirect to="/dashboard" />
    //   )
    // } else {
      return (
              <main className="landing-page">
                <div id="aad-title-container">
                  <div className="aad-title">ADVANCED</div>
                  <div className="aad-title">ANALYTIC</div>
                  <div className="aad-title">DEMONSTRATOR</div>
                </div>
  
                <div id="aad-paragraph">
                  <h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.
                  </h5>
                </div>
  
                <div id="signup-login-buttons-container">
                  <Link to="/signup">
                    <Button large={true} className="signup-login-buttons" waves='light'>Signup</Button>
                  </Link>
                  <Link to="/login">
                    <Button large={true} className="signup-login-buttons" waves='light'>Login</Button> 
                  </Link>
                </div>
              </main>         
      )
    // }
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
      toDash: state.auth.toDash
  }
}
// const mapDispatchToProps = dispatch => bindActionCreators({submitNewUser, checkUsername, checkCookie}, dispatch)

export default connect(mapStateToProps, null)(LandingPage)