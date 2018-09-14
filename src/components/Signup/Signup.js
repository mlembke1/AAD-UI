import React, { Component } from 'react';
import './Signup.css';
import { connect } from 'react-redux'
import { Row, Input, Button } from 'react-materialize'
class Signup extends Component {
  constructor(props) {
      super(props);
      this.state = {value: ''};
    }

    handleChange = (event) => {
      this.setState({value: event.target.value});
    }

    handleSubmit = (event) => {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }

  render() {
    return (
      <main>
        <h4 className="signup-login-header">Signup</h4>
        <Row className="login-signup-form">
            <Input className="signup-input" type="text" label="Username"  s={12} />
            <Input className="signup-input" type="email" label="Email"  s={12} />
            <Input className="signup-input" type="password" label="Password"  s={12} />
            <Input className="signup-input" type="password" label="Confirm Password"  s={12} />
            <Button large={true} className="login-signup-submit-button" waves='light'>Submit</Button> 
        </Row>
      </main> 
    )
  }
}


export default connect(null, null)(Signup)