import React, { Component } from 'react';
import './Login.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Input, Button } from 'react-materialize'
import { loginUser } from '../../actions/loginUser'
import { doesUsernameExist } from '../../actions/doesUsernameExist'
import { checkCookie } from '../../actions/checkCookie'
import { Redirect } from 'react-router-dom'

class Login extends Component {

  constructor(props){
    super(props)
    this.state ={
      usernameInputValue: '',
      passwordInputValue: ''
    }
  }

  validate = () => {
    if(this.state.usernameInputValue.length > 0 &&
       this.state.passwordInputValue.length > 0 &&
       this.props.usernameExists){
         return true
       } else {
         return false
       }
  }


  handleSubmit = () => {
    const user = {
      loginUsername: this.state.usernameInputValue,
      loginPassword: this.state.passwordInputValue
    }
    if(this.validate()){
      this.props.loginUser(user)
    }
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
            <h4 className="signup-login-header">Login</h4>
            <Row className="login-signup-form">
                <Input 
                  onChange={evt => this.updateInputValue(evt, 'usernameInputValue')} 
                  s={12} 
                  label="Username" 
                  onBlur={() => this.props.doesUsernameExist(this.state.usernameInputValue)} />
                <Input 
                onChange={evt => this.updateInputValue(evt, 'passwordInputValue')} 
                s={12} 
                type="password"
                label="Password" />
                {!this.props.usernameExists ? <div className="error-text">Username doesn't exist.</div> : null }
                {this.props.loginFailed ? <div className="error-text">Username or password was incorrect.</div> : null }
                <Button 
                  onClick={this.handleSubmit}
                  large={true} 
                  className={`login-signup-submit-button ${ !this.validate() ? "disabled" : null }`} 
                  waves='light'>Login</Button> 
            </Row>
       </main> 
    )
    }
  }
}


const mapStateToProps = state => {
  return {
      usernameExists: state.auth.usernameExists,
      loginFailed: state.auth.signupFailed,
      username: state.auth.username,
      toDash: state.auth.toDash,
      loginFailed: state.auth.loginFailed
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({loginUser, doesUsernameExist, checkCookie}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)