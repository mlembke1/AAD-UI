import React, { Component } from 'react';
import './LandingPage.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-materialize'
import { Link, Route } from 'react-router-dom'
import Header from '../Header/Header'
import PageFooter from '../PageFooter/PageFooter'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'


class LandingPage extends Component {

  render() {
    return (
      <div className="body">
          <Header />
          <main>
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
              <Route exact path="/login" component={Login}/>                  
              <Route exact path="/signup" component={Signup}/>                  
            </div>
          </main> 
          <PageFooter />
       </div>        
    )
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
  }
}

// const mapDispatchToProps = dispatch => bindActionCreators({checkCookie}, dispatch)

export default connect(mapStateToProps, null)(LandingPage)