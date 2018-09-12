import React, { Component } from 'react';
import './LandingPage.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '../Header/Header'
import PageFooter from '../PageFooter/PageFooter'
import { Button } from 'react-materialize'


class LandingPage extends Component {

  render() {
    return (
      <body>
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
              <Button className="signup-login-buttons" waves='light'>Signup</Button>
              <Button className="signup-login-buttons" waves='light'>Login</Button> 
            </div>
          </main> 
        <PageFooter />
       </body> 
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