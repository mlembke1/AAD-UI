import React, { Component } from 'react';
import './EditProfile.css';
import {  Icon, Button, Row, Col, Input, Collapsible, CollapsibleItem, CardPanel } from 'react-materialize'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateUsername } from '../../actions/updateUsername'
import { isUsernameTaken } from '../../actions/isUsernameTaken'
import { validateCurrentPasswordInput } from '../../actions/validateCurrentPasswordInput'
import { validateNewPasswordInput } from '../../actions/validateNewPasswordInput'
import { Redirect } from 'react-router-dom'

class EditProfile extends Component {

    constructor(props) { 
        super(props)
        this.state = {
            noUsernameChange: true,
            usernameInputValue: this.props.username,
            passwordsMatch: true,
            usernameLengthPasses: true,
            usernameLabel: "Your Current Username",
            updateUsernameDisabled: true, 
            updatePasswordDisabled: true,
            usernameAlreadyTaken: this.props.usernameIsTaken,
            currentPasswordInput: "",
            currentPasswordInputPasses: false,
            newPasswordInput: "", 
            newPasswordInputLengthPasses: false,
            confirmNewPasswordInput: "",
            confirmNewPasswordInputLengthPasses: false,
            passwordsMatch: false,
            newPasswordInputLabel: "Type your new password",
            confirmPasswordInputLabel: "Confirm your new password"
        }
    }
    passwordsMatch = () => this.state.newPasswordInput === this.state.confirmNewPasswordInput
      
    setPasswordsMatch = async () => this.setState({...this.state, passwordsMatch: this.passwordsMatch()})

    setNewPasswordInputLengthPasses = async () => {
        return this.setState({
          ...this.state,
          newPasswordInputLengthPasses: this.state.newPasswordInput.length >= 8 && this.state.newPasswordInput.length <= 30 
        })
    }

    ensureNewPasswordIsDifferent = async () => this.props.validateNewPasswordInput(this.props.username, this.state.newPasswordInput)
    
    setConfirmPasswordInputLengthPasses = async () => {
        return this.setState({...this.state, 
            confirmNewPasswordInputLengthPasses: this.state.confirmNewPasswordInput.length >= 8 && this.state.confirmNewPasswordInput.length <= 30})
    } 

    setUsernameLengthPasses = async () => {
        return this.setState({...this.state,
          usernameLengthPasses: this.state.usernameInputValue.length >= 8 && this.state.usernameInputValue.length <= 30})
    } 

    updateInput = async (evt, inputType) => this.setState({ ...this.state, [inputType]: evt.target.value }, () => this.validate(inputType))

    setNoUsernameChange = async () => this.setState({...this.state, noUsernameChange: this.props.username == this.state.usernameInputValue})
    
    setUsernameIsAlreadyTaken = async () => this.props.isUsernameTaken(this.state.usernameInputValue);

    setValidateCurrentPasswordInput = async () => this.props.validateCurrentPasswordInput(this.props.username, this.state.currentPasswordInput);
      
    validateUsername = async () => { 
        await this.setUsernameIsAlreadyTaken()
        await this.setNoUsernameChange();
        await this.setUsernameLengthPasses();
        setTimeout(() => {this.generateUsernameLabel()}, 100)
    }

    validateNewPassword = async () => {
        await this.setNewPasswordInputLengthPasses()
        await this.ensureNewPasswordIsDifferent()
        setTimeout(() =>  this.generateNewPasswordInputLabel(), 100)
    }

    validateConfirmPassword = async () => {
        await this.setConfirmPasswordInputLengthPasses()
        await this.setPasswordsMatch()
        await this.generateConfirmPasswordInputLabel()
    }

    validate = async inputType => {
        if (inputType == "usernameInputValue") {
            await this.validateUsername()
        } else if (inputType == "currentPasswordInput" && this.state.currentPasswordInput.length > 0){
            await this.setValidateCurrentPasswordInput()
        } else if (inputType == "newPasswordInput" && this.state.newPasswordInput.length > 0) {
            await this.validateNewPassword()
        } else {
            await this.validateConfirmPassword()
        }
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

    generateNewPasswordInputLabel = async () => {
        if(this.state.newPasswordInputLengthPasses && this.props.newPasswordInputPasses) {
            this.setState({...this.state, newPasswordInputLabel: "Looks good to us!"})
        } else if(!this.state.newPasswordInputLengthPasses && this.state.newPasswordInput.length > 0) {
            this.setState({...this.state, newPasswordInputLabel: "All passwords must have a length of 8-30 characters."})
        } else if (this.state.newPasswordInputLengthPasses && !this.props.newPasswordInputPasses){
            this.setState({...this.state, newPasswordInputLabel: "This is your current password... Please try another one."})
        } else if ( this.state.newPasswordInput.length < 1){
            this.setState({...this.setState, newPasswordInputLabel: "Type your new password"})
        }
    }

    generateConfirmPasswordInputLabel = async () => {
        if (this.state.confirmNewPasswordInputLengthPasses && this.state.passwordsMatch){
            this.setState({...this.state, confirmPasswordInputLabel: "Match Confirmed!"})
        } else if (!this.state.confirmNewPasswordInputLengthPasses ){
            this.setState({...this.state, confirmPasswordInputLabel: "All passwords must have a length of 8-30 characters."})
        } else if (!this.state.passwordsMatch && this.state.confirmNewPasswordInputLengthPasses){
            this.setState({...this.state, confirmPasswordInputLabel: "These passwords do not match"})
        } else if (this.state.confirmNewPasswordInput.length < 1){
            this.setState({...this.state, confirmPasswordInputLabel: "Confirm your new password."})
        }
    }

    handleUsernameUpdate = () => this.props.updateUsername(this.props.username, this.state.usernameInputValue)
    
    render() {
        if(!this.props.username) {
            return <Redirect to="/" />
          } else {
            return(
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
                                            "error-text" : 'success-text'}>{this.state.usernameLabel}{!this.props.usernameIsTaken && !this.state.noUsernameChange && this.state.usernameLengthPasses ? <Icon>check</Icon> : null}</span>} 
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
                                        label={<span 
                                            className={this.props.currentPasswordInputPasses ? 'success-text': null}>
                                            {this.props.currentPasswordInputPasses ? "Correct" : "Type your current password."}{this.props.currentPasswordInputPasses ? <Icon>check</Icon> : null}
                                        </span>} 
                                        s={12} 
                                        value={this.state.currentPasswordInput}
                                        type="password"
                                        onChange={evt => this.updateInput(evt, "currentPasswordInput")}>
                                        </Input>

                                         <Input 
                                         disabled={!this.props.currentPasswordInputPasses}
                                        label={<span 
                                            className={this.state.newPasswordInputLengthPasses && this.props.newPasswordInputPasses ?
                                             "success-text": this.state.newPasswordInput.length > 0 &&
                                              (!this.state.newPasswordInputLengthPasses || !this.props.newPasswordInputPasses) ? "error-text" : null }>
                                              {this.state.newPasswordInputLabel}
                                              {this.state.newPasswordInputLengthPasses && this.props.newPasswordInputPasses ? <Icon>check</Icon> : null}
                                            </span>} 
                                        s={12} 
                                        value={this.state.newPasswordInput}
                                        type="password"
                                        onChange={evt => this.updateInput(evt, "newPasswordInput")}>
                                        </Input>

                                        <Input 
                                        disabled={!this.state.newPasswordInputLengthPasses || !this.props.newPasswordInputPasses}
                                        label={<span 
                                                className={(!this.state.confirmNewPasswordInputLengthPasses && this.state.confirmNewPasswordInput.length > 0) ||
                                                            (this.state.confirmNewPasswordInput.length > 0 && !this.state.passwordsMatch) ? "error-text" : 
                                                            this.state.confirmNewPasswordInputLengthPasses && this.state.confirmNewPasswordInput.length > 0 && this.state.passwordsMatch ? "success-text" : null}>
                                            {this.state.confirmPasswordInputLabel}
                                            {this.state.passwordsMatch? <Icon>check</Icon> : null}
                                        </span>} 
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
                                    disabled={this.state.confirmPasswordInputLabel != "Match Confirmed!"}className="login-signup-submit-button">
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
  }

  const mapStateToProps = state => {
    return {
        username: state.auth.username,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
        usernameIsTaken: state.auth.usernameIsTaken,
        currentPasswordInputPasses: state.auth.currentPasswordInputPasses,
        newPasswordInputPasses: state.auth.newPasswordInputPasses
    }
  }
  
  const mapDispatchToProps = dispatch => bindActionCreators({updateUsername, isUsernameTaken, validateCurrentPasswordInput, validateNewPasswordInput}, dispatch)
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)    