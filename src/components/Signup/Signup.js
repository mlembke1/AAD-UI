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
import { resetState } from '../../actions/resetState'
class Signup extends Component {

  componentWillMount(){
    this.props.resetState()
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
        slackIsChecked: true,
        usernameLengthPasses: true,
        passwordLengthPasses: true,
        confirmPasswordLengthPasses: true
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

    setPasswordLengthPasses = () => {
      console.log('Here is the password length', this.state.passwordInputValue.length)
      if(this.state.passwordInputValue.length >= 8 && this.state.passwordInputValue.length <= 30 ){
        this.setState({
          ...this.state,
          passwordLengthPasses: true
        })
      } else {
        this.setState({
          ...this.state,
          passwordLengthPasses: false
        })
      }
    }
    
    setConfirmPasswordLengthPasses = () => {
      console.log('Here is the confirm password length', this.state.confirmPasswordInputValue.length)
      if(this.state.confirmPasswordInputValue.length >= 8 && this.state.confirmPasswordInputValue.length <= 30 ){
        this.setState({
          ...this.state,
          confirmPasswordLengthPasses: true
        })
      } else {
        this.setState({
          ...this.state,
          confirmPasswordLengthPasses: false
        })
      }
    } 

    setUsernameLengthPasses = () => {
      if(this.state.usernameInputValue.length >= 8 && this.state.usernameInputValue.length <= 30 ){
        this.setState({
          ...this.state,
          usernameLengthPasses: true
        })
      } else {
        this.setState({
          ...this.state,
          usernameLengthPasses: false
        })
      }
    } 

    setEmailIsValid = (email) => {
      this.props.validateEmail(email)
    }

    
    passwordHandler = async  () => {
      await this.setPasswordLengthPasses()
      await this.setPasswordsMatch()
    }
    
    confirmPasswordHandler = async  () => {
      await this.setConfirmPasswordLengthPasses()
      await this.setPasswordsMatch()
    }


    usernameHandler = () => {
      this.props.isUsernameTaken(this.state.usernameInputValue)
      this.setUsernameLengthPasses()
    }
    
    updateInputValue = (evt, inputType) => {
      this.setState({[inputType]: evt.target.value}, () => this.validatePasswords(inputType))
    }

    validatePasswords = inputType => {
      if(inputType == "passwordInputValue"){
        this.passwordHandler()
      }
      if(inputType == "confirmPasswordInputValue"){
        this.confirmPasswordHandler()
      }
    }
    
    handleSubmit = () => {
      const user = {
        signupUsername: this.state.usernameInputValue,
        signupEmail: this.state.emailInputValue,
        signupPassword: this.state.passwordInputValue
      }
      if(this.passwordsMatch() && !this.props.invalidEmail && !this.props.emailIsTaken && this.state.usernameLengthPasses && this.state.passwordLengthPasses){
        this.props.submitNewUser(user)
        if (this.state.slackIsChecked) {
          this.props.inviteToSlack(this.state.emailInputValue);
        }
      } else { 
          this.passwordHandler()
          this.usernameHandler()
       }
    }


  render() {
      return (
        <main>
          <h4 className="signup-login-header">Signup</h4>
          <Row className="login-signup-form">
              <Input 
                onBlur={() => this.usernameHandler()} 
                value={this.state.usernameInputValue}
                onChange={evt => this.updateInputValue(evt, 'usernameInputValue')}
                className="signup-input" 
                type="text" 
                label="Username"
                s={12} /> 
                {this.props.usernameIsTaken ? <div className="error-text">Username already taken.</div> : null }
                {!this.state.usernameLengthPasses ? <div className="error-text">Username must be between 8 and 30 characters.</div> : null }
                
                <Input 
                onBlur={() => this.setEmailIsValid(this.state.emailInputValue)} 
                value={this.state.emailInputValue}
                onChange={evt => this.updateInputValue(evt, 'emailInputValue')}
                className="signup-input" 
                type="email" 
                label="Email"
                s={12} /> 
                {this.props.invalidEmail ? <div className="error-text">Invalid Email.</div> : null }
                {this.props.emailIsTaken ? <div className="error-text">Email already taken.</div> : null }
                
                <Input 
                // onBlur={() => this.passwordHandler()}
                value={this.state.passwordInputValue}
                onChange={evt => this.updateInputValue(evt, 'passwordInputValue')}
                className="signup-input"
                type="password"
                label="Password"
                s={12} /> 
                {!this.state.passwordLengthPasses ? <div className="error-text">Password must be between 8 and 30 characters.</div> : null }
              
               <Input 
                // onBlur={() => this.confirmPasswordHandler()}
                value={this.state.confirmPasswordInputValue}
                onChange={evt => this.updateInputValue(evt, 'confirmPasswordInputValue')}
                className="signup-input"
                type="password" 
                label="Confirm Password"
                s={12} />
                {!this.state.confirmPasswordLengthPasses ? <div className="error-text">Confirm password must be between 8 and 30 characters.</div> : null }
                {!this.state.passwordsMatch ? <div className="error-text">Passwords must match.</div> : null }
                
                <Input 
                checked={this.state.slackIsChecked}
                onChange={() => this.onCheckSlack()}
                className="signup-input"
                type="checkbox" 
                label="Join Slack Channel"
                s={12} /> 
               {this.props.signupFailed ? <div className="error-text">Signup Failed.</div> : null }
              
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
  inviteToSlack,
  resetState
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Signup)