import React, { Component } from 'react';
import './Login.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Input, Button, Icon } from 'react-materialize'
import { loginUser } from '../../actions/loginUser'
import { doesUsernameExist } from '../../actions/doesUsernameExist'
import { authenticate } from '../../actions/authenticate'
import { getUserInfo } from '../../actions/getUserInfo'
import { resetState } from '../../actions/resetState'
import { Redirect } from 'react-router-dom'

class Login extends Component {

  componentWillMount(){
    this.props.authenticate().then(r => r).catch(err => err)
    this.props.getUserInfo().then(r => r).catch(err => err)
  }


  constructor(props){
    super(props)
    this.state ={
      usernameInputValue: '',
      passwordInputValue: '',
      usernameLengthPasses: true,
      passwordLengthPasses: true
    }
  }

  setUsernameLengthPasses = () => {
    if(this.state.usernameInputValue.length >= 8 && this.state.usernameInputValue.length <= 30){
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

  setPasswordLengthPasses = () => {
      if(this.state.passwordInputValue.length >= 8 && this.state.passwordInputValue.length <= 30){
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

  handleUsername = async () => {
    await this.setUsernameLengthPasses()
    await this.props.doesUsernameExist(this.state.usernameInputValue)
  }


  handleSubmit = () => {
    const user = {
      loginUsername: this.state.usernameInputValue,
      loginPassword: this.state.passwordInputValue
    }
    if(this.state.passwordLengthPasses &&
       this.state.usernameLengthPasses &&
       this.props.usernameExists){
      this.props.loginUser(user)
    }
  }

  updateInputValue(evt, inputType) {
    return this.setState({ [inputType]: evt.target.value }, () => this.validate(inputType))
  }

  validate = async inputType => {
    if(inputType == 'passwordInputValue'){
      this.setPasswordLengthPasses()
    } else if (inputType == 'usernameInputValue'){
      await this.handleUsername()
    } 
  }

  render() {
    if(this.props.username){
      return <Redirect to="/dashboard" />
    } else {
      return (
        <main>
              <h4 className="signup-login-header login-header">Login</h4>
              <Row className="login-signup-form">
                  <Input 
                    onChange={evt => this.updateInputValue(evt, 'usernameInputValue')} 
                    s={12} 
                    label="Username" />
                  {!this.props.usernameExists ? <div className="error-text">Username doesn't exist.</div> : null }
                  {!this.state.usernameLengthPasses ? <div className="error-text">All usernames are 8-30 characters long.</div> : null }
                  <Input 
                  onChange={evt => this.updateInputValue(evt, 'passwordInputValue')} 
                  s={12} 
                  type="password"
                  label="Password" />
                  {!this.state.passwordLengthPasses ? <div className="error-text">All passwords are 8-30 characters long.</div> : null }
                  <Button 
                    onClick={this.handleSubmit}
                    large={true} 
                    className={`login-signup-submit-button ${ 
                      this.state.usernameInputValue.length < 1 ||
                      this.state.passwordInputValue.length < 1 ||
                      !this.props.usernameExists ||
                      !this.state.usernameLengthPasses ||
                      !this.state.passwordLengthPasses
                       ? "disabled" : null }`} 
                    waves='light'>
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
      usernameExists: state.auth.usernameExists,
      username: state.auth.username,
      toDash: state.auth.toDash
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  loginUser,
  doesUsernameExist,
  authenticate,
  getUserInfo,
  resetState}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)