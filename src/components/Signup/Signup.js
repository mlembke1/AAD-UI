import React, { Component } from 'react';
import './Signup.css';
import { connect } from 'react-redux'
import { Row, Input, Button, Col, Icon } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { submitNewUser } from '../../actions/submitNewUser'
import { isUsernameTaken } from '../../actions/isUsernameTaken'
import { authenticate } from '../../actions/authenticate'
import { getUserInfo } from '../../actions/getUserInfo'
import { validateEmail } from '../../actions/validateEmail'
import { inviteToSlack } from '../../actions/inviteToSlack'
import { resetState } from '../../actions/resetState'
import { Redirect } from 'react-router-dom'
class Signup extends Component {

  componentWillMount(){
    this.props.authenticate().then(r => r).catch(err => err)
    this.props.getUserInfo().then(r => r).catch(err => err)
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
        confirmPasswordLengthPasses: true,
        firstNameInputValue: "",
        lastNameInputValue: "",
        jobTitleInputValue: "",
        companyInputValue: ""
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
        signupPassword: this.state.passwordInputValue,
        firstName: this.state.firstNameInputValue,
        lastName: this.state.lastNameInputValue,
        jobTitle: this.state.jobTitleInputValue,
        company: this.state.companyInputValue
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
    if(this.props.username){
      return <Redirect to="/dashboard" />
    } else {
      return (
        <main>
          <h4 className="signup-login-header">Signup</h4>
          <Row className="login-signup-form">
              <Row>
                  <Col s={3}>
                        <Input 
                        required
                      onChange={evt => this.updateInputValue(evt, 'firstNameInputValue')}
                      value={this.state.firstNameInputValue}
                      className="signup-input"
                      type="text"
                      label={<span>First Name<span className="error-text">*</span></span>}
                      s={12} />
                  </Col>
                  <Col s={3}>
                      <Input 
                      required
                      onChange={evt => this.updateInputValue(evt, 'lastNameInputValue')}
                      value={this.state.lastNameInputValue}
                      className="signup-input"
                      type="text"
                      label={<span>Last Name<span className="error-text">*</span></span>}
                      s={12} />
                  </Col>
                  <Col s={3}>
                      <Input 
                      required
                      onChange={evt => this.updateInputValue(evt, 'jobTitleInputValue')}
                      value={this.state.jobTitleInputValue}
                      className="signup-input"
                      type="text"
                      label={<span>Job Title<span className="error-text">*</span></span>}
                      s={12} /> 
                  </Col>
                  <Col s={3}>
                      <Input 
                      required
                      onChange={evt => this.updateInputValue(evt, 'companyInputValue')}
                      value={this.state.companyInputValue}
                      className="signup-input"
                      type="text"
                      label={<span>Company<span className="error-text">*</span></span>}
                      s={12} /> 
                  </Col>
              </Row>
              <Row>
                <Col s={6}>
                  <Input 
                  onBlur={() => this.usernameHandler()} 
                  value={this.state.usernameInputValue}
                  onChange={evt => this.updateInputValue(evt, 'usernameInputValue')}
                  className="signup-input" 
                  type="text" 
                  label={<span>Username<span className="error-text">*</span></span>}
                  s={12}
                  /> 
                  {this.props.usernameIsTaken ? <div className="error-text">Username already taken.</div> : null }
                  {!this.state.usernameLengthPasses ? <div className="error-text">Username must be between 8 and 30 characters.</div> : null }
                </Col>
                <Col s={6}>
                  <Input 
                  onBlur={() => this.setEmailIsValid(this.state.emailInputValue)} 
                  value={this.state.emailInputValue}
                  onChange={evt => this.updateInputValue(evt, 'emailInputValue')}
                  className="signup-input" 
                  type="email" 
                  label={<span>Email<span className="error-text">*</span></span>}
                  s={12}
                   /> 
                  {this.props.invalidEmail ? <div className="error-text">Invalid Email.</div> : null }
                  {this.props.emailIsTaken ? <div className="error-text">Email already taken.</div> : null }
                </Col>
              </Row>
              <Row>
                <Col s={6}>
                  <Input 
                  value={this.state.passwordInputValue}
                  onChange={evt => this.updateInputValue(evt, 'passwordInputValue')}
                  className="signup-input"
                  type="password"
                  label={<span>Password<span className="error-text">*</span></span>}
                  s={12}
                  /> 
                  {!this.state.passwordLengthPasses ? <div className="error-text">Password must be between 8 and 30 characters.</div> : null }
                </Col>
                <Col s={6}>
                  <Input 
                  value={this.state.confirmPasswordInputValue}
                  onChange={evt => this.updateInputValue(evt, 'confirmPasswordInputValue')}
                  className="signup-input"
                  type="password" 
                  label={<span>Confirm Password<span className="error-text">*</span></span>}
                  s={12}
                   />
                  {!this.state.confirmPasswordLengthPasses ? <div className="error-text">Confirm password must be between 8 and 30 characters.</div> : null }
                  {!this.state.passwordsMatch ? <div className="error-text">Passwords must match.</div> : null }
                </Col>
              </Row>
                
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
                this.props.invalidEmail || this.props.emailIsTaken ||
                this.state.firstNameInputValue.length < 1 || this.state.lastNameInputValue.length < 1 ||
                this.state.jobTitleInputValue.length < 1 || this.state.companyInputValue.length < 1
                ? "disabled" : '' }` } 
                waves='light'
                >
                <Icon className="login-signup-button-icon">send</Icon>
                </Button> 
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
      toDash: state.auth.toDash,
      invalidEmail: state.auth.invalidEmail,
      emailIsTaken: state.auth.emailIsTaken
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  submitNewUser, 
  isUsernameTaken, 
  authenticate,
  getUserInfo,
  validateEmail,
  inviteToSlack,
  resetState
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Signup)