import React, { Component } from 'react';
import './Login.css';
import { connect } from 'react-redux'
import { Row, Input, Button } from 'react-materialize'

class Login extends Component {

  render() {
    return (
      <main>
            <h4 className="signup-login-header">Login</h4>
            <Row className="login-signup-form">
                <Input s={12} label="Username" />
                <Input s={12} label="Password" />
                <Button large={true} className="login-signup-submit-button" waves='light'>Login</Button> 
            </Row>
       </main> 
    )
  }
}


export default connect(null, null)(Login)