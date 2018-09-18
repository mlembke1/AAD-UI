import React, { Component } from 'react';
import './Signup.css';
import { connect } from 'react-redux'
import { Row, Input, Button } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { submitNewUser } from '../../actions/submitNewUser'
import { isUsernameTaken } from '../../actions/isUsernameTaken'
import { checkCookie } from '../../actions/checkCookie'
import { Redirect } from 'react-router-dom'
class Signup extends Component {

    constructor(props){
      super(props)
      this.state ={
        usernameInputValue: '',
        passwordInputValue: '',
        confirmPasswordInputValue: '',
        passwordsMatch: true
      }
    }

    passwordsMatch = () => this.state.passwordInputValue === this.state.confirmPasswordInputValue

    setPasswordsMatch = () => {
      if(this.passwordsMatch()){
        this.setState({
          ...this.state,
          passwordsMatch: true
        })
      } else {
        this.setState({
          ...this.state,
          passwordsMatch: false
        })
      }
    }

    handleSubmit = () => {
      const user = {
        signupUsername: this.state.usernameInputValue,
        signupPassword: this.state.passwordInputValue
      }
      if(this.passwordsMatch()){
        this.props.submitNewUser(user)
      } else { this.setPasswordsMatch() }
    }

    updateInputValue(evt, inputType) {
      return this.setState({
        [inputType]: evt.target.value
      })
    }



  render() {
    if(this.props.toDash) {
      this.props.checkCookie()
      return (
        <Redirect to="/dashboard"/>
      )
    } else {
      return (
        <main>
          <h4 className="signup-login-header">Signup</h4>
          <Row className="login-signup-form">
              <Input 
                onBlur={() => this.props.isUsernameTaken(this.state.usernameInputValue)} 
                value={this.state.usernameInputValue}
                onChange={evt => this.updateInputValue(evt, 'usernameInputValue')}
                className="signup-input" 
                type="text" 
                label="Username"
                s={12} /> 
              <Input 
                onBlur={() => this.setPasswordsMatch()}
                value={this.state.passwordInputValue}
                onChange={evt => this.updateInputValue(evt, 'passwordInputValue')}
                className="signup-input"
                type="password"
                label="Password"
                s={12} /> 
              <Input 
                onBlur={() => this.setPasswordsMatch()}
                value={this.state.confirmPasswordInputValue}
                onChange={evt => this.updateInputValue(evt, 'confirmPasswordInputValue')}
                className="signup-input"
                type="password" 
                label="Confirm Password"
                s={12} /> 
               {this.props.usernameIsTaken ? <div className="error-text">Username already taken.</div> : null }
               {!this.state.passwordsMatch ? <div className="error-text">Passwords must match.</div> : null }
               {this.props.signupFailed ? <div className="error-text">Signup Failed.</div> : null }
              <Button
               onClick={this.handleSubmit}
               large={true} 
               className={`login-signup-submit-button 
               ${this.state.usernameInputValue.length < 1 ||
                this.state.passwordInputValue.length < 1 ||
                this.state.confirmPasswordInputValue.length < 1 ||
                !this.state.passwordsMatch || this.props.usernameIsTaken ? "disabled" : '' }` } 
                waves='light'
                >Submit</Button> 
          </Row>
        </main> 
      )
    }
  }
}
const mapStateToProps = state => {
  return {
      usernameIsTaken: state.auth.usernameIsTaken,
      signupFailed: state.auth.signupFailed,
      username: state.auth.username,
      toDash: state.auth.toDash
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({submitNewUser, isUsernameTaken, checkCookie}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Signup)