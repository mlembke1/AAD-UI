import React, { Component } from 'react';
import './LandingPage.css';
import { connect } from 'react-redux'
import { Button } from 'react-materialize'
import { Link, Route } from 'react-router-dom'
import Header from '../Header/Header'
import PageFooter from '../PageFooter/PageFooter'


class LandingPage extends Component {

  render() {
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
  }
}


export default connect(null, null)(LandingPage)