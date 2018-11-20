import React, { Component } from 'react';
import './EditProfile.css';
import {  Icon, Button, Row, Col, Input, Collapsible, CollapsibleItem, CardPanel } from 'react-materialize'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateUsername } from '../../actions/updateUsername'
import { isUsernameTaken } from '../../actions/isUsernameTaken'

class EditProfile extends Component {

    constructor(props) { 
        super(props)
        this.state = {
            noUsernameChange: true,
            usernameInputValue: this.props.username,
            passwordInputValue: '',
            confirmPasswordInputValue: '',
            passwordsMatch: true,
            usernameLengthPasses: true,
            passwordLengthPasses: true,
            confirmPasswordLengthPasses: true,
            usernameLabel: "Your Current Username",
            updateUsernameDisabled: true, 
            updatePasswordDisabled: true,
            usernameAlreadyTaken: this.props.usernameIsTaken,
            currentPasswordInput: "",
            currentPasswordInputPasses: false
        }
    }
    passwordsMatch = () => this.state.passwordInputValue === this.state.confirmPasswordInputValue
      
    setPasswordsMatch = () => this.setState({...this.state, passwordsMatch: this.passwordsMatch()})

    setPasswordLengthPasses = async() => {
        return this.setState({
          ...this.state,
          passwordLengthPasses: this.state.passwordInputValue.length >= 8 && this.state.passwordInputValue.length <= 30 
        })
    }
    
    setConfirmPasswordLengthPasses = async () => {
        return this.setState({
          ...this.state,
          confirmPasswordLengthPasses: this.state.confirmPasswordInputValue.length >= 8 && this.state.confirmPasswordInputValue.length <= 30 
        })
    } 

    setUsernameLengthPasses = async () => {
        return this.setState({
          ...this.state,
          usernameLengthPasses: this.state.usernameInputValue.length >= 8 && this.state.usernameInputValue.length <= 30
        })
    } 

    updateInput = async (evt, inputType) => this.setState({ ...this.state, [inputType]: evt.target.value }, () => this.validateUsername())

    setNoUsernameChange = async () => this.setState({...this.state, noUsernameChange: this.props.username == this.state.usernameInputValue})
    
    setUsernameIsAlreadyTaken = async () => this.props.isUsernameTaken(this.state.usernameInputValue);
      
    validateUsername = async () => { 
        await this.setUsernameIsAlreadyTaken()
        await this.setNoUsernameChange();
        await this.setUsernameLengthPasses();
        setTimeout(() => {this.generateUsernameLabel()}, 100)
    }

    generateUsernameLabel = async () => {
        if(!this.props.usernameIsTaken && !this.state.noUsernameChange && this.state.usernameLengthPasses){
            this.setState({...this.state, usernameLabel: "Your New Username", updateUsernameDisabled: false})
        } else if (this.props.usernameIsTaken && !this.state.noUsernameChange && this.state.usernameLengthPasses)  {
            this.setState({...this.state, usernameLabel: "Username Already Taken... Please try another.", updateUsernameDisabled: true})
        }  else if (!this.state.noUsernameChange && !this.state.usernameLengthPasses) {
            this.setState({...this.state, usernameLabel: "Username must be between 8-30 characters.", updateUsernameDisabled: true})
        } else if (this.state.noUsernameChange) {
            this.setState({...this.state, usernameLabel: "Your Current Username.", updateUsernameDisabled: true})
        }                  
    }

    handleUsernameUpdate = () => this.props.updateUsername(this.props.username, this.state.usernameInputValue)
    
    render() {
    return (
            <main className="landing-page edit-profile-wrapper">
                <h3>Edit Profile</h3>
                <CardPanel className="max-width-60 card-panel">
                    <Row>
                        <Collapsible>
                            <CollapsibleItem header="Username" left icon="edit">
                                <Row>
                                    <Col s={12}>
                                        <Input   
                                        className={this.state.updateUsernameDisabled ? "margin-top-10" : null}
                                        label={<span className={
                                            this.props.usernameIsTaken && !this.state.noUsernameChange && this.state.usernameLengthPasses ||
                                            !this.state.noUsernameChange && !this.state.usernameLengthPasses ?
                                            "error-text" : 'success-text'}>{this.state.usernameLabel}</span>} 
                                        s={12} 
                                        value={this.state.usernameInputValue}
                                        onChange={evt => this.updateInput(evt, "usernameInputValue")}>
                                        </Input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Button 
                                    s={12}
                                    onClick={() => this.handleUsernameUpdate()}
                                    disabled={this.state.updateUsernameDisabled}
                                    className="login-signup-submit-button">
                                        Update Username
                                        <Icon right>check</Icon>
                                    </Button>
                                </Row>
                            </CollapsibleItem>

                            <CollapsibleItem header="Password" left icon="lock">
                                <Row>
                                    <Col s={12}>
                                        <Input 
                                        label={this.state.currentPasswordInputPasses ? "Thanks!" : "Type your current password."} 
                                        s={12} 
                                        value={this.state.currentPasswordInput}
                                        type="password"
                                        onChange={evt => this.updateInput(evt, "currentPasswordInput")}>
                                        </Input>

                                         <Input 
                                        label={this.state.newPasswordInputPasses ? "Thanks!" : "Type your new password."} 
                                        s={12} 
                                        value={this.state.newPasswordInput}
                                        type="password"
                                        onChange={evt => this.updateInput(evt, "newPasswordInput")}>
                                        </Input>

                                        <Input 
                                        label={this.state.confirmNewPasswordInputPasses ? "Thanks!" : "Confirm your new password."} 
                                        s={12} 
                                        value={this.state.confirmNewPasswordInput}
                                        type="password"
                                        onChange={evt => this.updateInput(evt, "confirmNewPasswordInput")}>
                                        </Input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Button 
                                    s={12}
                                    onClick={() => this.handlePasswordUpdate()}
                                    disabled={this.state.updatePasswordDisabled}className="login-signup-submit-button">
                                        Update Password
                                        <Icon right>check</Icon>
                                    </Button>
                                </Row>
                            </CollapsibleItem>
                        </Collapsible>
                    </Row>
                </CardPanel>
            </main>
        )
    }
  }

  const mapStateToProps = state => {
    return {
        username: state.auth.username,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
        usernameIsTaken: state.auth.usernameIsTaken
    }
  }
  
  const mapDispatchToProps = dispatch => bindActionCreators({updateUsername, isUsernameTaken}, dispatch)
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)    