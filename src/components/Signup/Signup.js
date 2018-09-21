import React, { Component } from 'react';
import './Signup.css';
import { connect } from 'react-redux'
import { Row, Input, Button } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { submitNewUser } from '../../actions/submitNewUser'
import { isUsernameTaken } from '../../actions/isUsernameTaken'
import { checkCookie } from '../../actions/checkCookie'
import { validateEmail } from '../../actions/validateEmail'
import { inviteToSlack } from '../../actions/inviteToSlack'
import { Redirect } from 'react-router-dom'
class Signup extends Component {

  componentWillMount(){
    this.props.checkCookie() 
  }

    constructor(props){
      super(props)
      this.state ={
        usernameInputValue: '',
        emailInputValue: '',
        passwordInputValue: '',
        confirmPasswordInputValue: '',
        passwordsMatch: true,
        slackIsChecked: true
      }
    }

    onCheckSlack = () => this.setState({...this.state, slackIsChecked: !this.state.slackIsChecked})

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

    setEmailIsValid = (email) => {
      this.props.validateEmail(email)
    }

    handleSubmit = () => {
      const user = {
        signupUsername: this.state.usernameInputValue,
        signupEmail: this.state.emailInputValue,
        signupPassword: this.state.passwordInputValue
      }
      if(this.passwordsMatch() && !this.props.invalidEmail && !this.props.emailIsTaken){
        this.props.submitNewUser(user)
        if (this.state.slackIsChecked) {
          this.props.inviteToSlack(this.state.emailInputValue);
        }
      } else { this.setPasswordsMatch() }
    }

    updateInputValue(evt, inputType) {
      return this.setState({
        [inputType]: evt.target.value
      })
    }



  render() {
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
                onBlur={() => this.setEmailIsValid(this.state.emailInputValue)} 
                value={this.state.emailInputValue}
                onChange={evt => this.updateInputValue(evt, 'emailInputValue')}
                className="signup-input" 
                type="email" 
                label="Email"
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
                <Input 
                checked={this.state.slackIsChecked}
                onChange={() => this.onCheckSlack()}
                className="signup-input"
                type="checkbox" 
                label="Join Slack Channel"
                s={12} /> 
               {this.props.usernameIsTaken ? <div className="error-text">Username already taken.</div> : null }
               {!this.state.passwordsMatch ? <div className="error-text">Passwords must match.</div> : null }
               {this.props.signupFailed ? <div className="error-text">Signup Failed.</div> : null }
               {this.props.invalidEmail ? <div className="error-text">Invalid Email.</div> : null }
               {this.props.emailIsTaken ? <div className="error-text">Email already taken.</div> : null }
              <Button
               onClick={this.handleSubmit}
               large={true} 
               className={`login-signup-submit-button 
               ${this.state.usernameInputValue.length < 1 ||
                this.state.passwordInputValue.length < 1 ||
                this.state.confirmPasswordInputValue.length < 1 ||
                !this.state.passwordsMatch || 
                this.props.usernameIsTaken ||
                this.props.invalidEmail || this.props.emailIsTaken  ? "disabled" : '' }` } 
                waves='light'
                >Submit</Button> 
          </Row>
        </main> 
      )
  }
}
const mapStateToProps = state => {
  return {
      usernameIsTaken: state.auth.usernameIsTaken,
      signupFailed: state.auth.signupFailed,
      username: state.auth.username,
      toDash: state.auth.toDash,
      invalidEmail: state.auth.invalidEmail,
      emailIsTaken: state.auth.emailIsTaken
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  submitNewUser, 
  isUsernameTaken, 
  checkCookie,
  validateEmail,
  inviteToSlack
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Signup)