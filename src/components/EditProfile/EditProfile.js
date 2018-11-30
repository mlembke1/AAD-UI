import React, { Component } from 'react';
import './EditProfile.css';
import {  Icon, Button, Row, Col, Input, Collapsible, CollapsibleItem, CardPanel } from 'react-materialize'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateUsername } from '../../actions/updateUsername'
import { updatePassword } from '../../actions/updatePassword'
import { isUsernameTaken } from '../../actions/isUsernameTaken'
import { getUserInfo } from '../../actions/getUserInfo'
import { checkCookie } from '../../actions/checkCookie'
import { validateCurrentPasswordInput } from '../../actions/validateCurrentPasswordInput'
import { validateNewPasswordInput } from '../../actions/validateNewPasswordInput'
import { updateFullName } from '../../actions/updateFullName'
import { updateWork } from '../../actions/updateWork'
import { Redirect } from 'react-router-dom'

class EditProfile extends Component {

    constructor(props) { 
        super(props)
        this.state = {
            updatePasswordDisabled: true, usernameAlreadyTaken: this.props.usernameIsTaken,
            currentPasswordInput: "", currentPasswordInputPasses: false, newPasswordInput: "", 
            newPasswordInputLengthPasses: false, confirmNewPasswordInput: "", confirmNewPasswordInputLengthPasses: false,
            passwordsMatch: false, newPasswordInputLabel: "Type your new password", confirmPasswordInputLabel: "Confirm your new password",
            currentPasswordInputLabel: "Type your current password", firstNameInput: this.props.firstName,
            lastNameInput: this.props.lastName, firstNameInputLabel: "Current First Name",  lastNameInputLabel: "Current Last Name",
            updateFullNameDisabled: true, jobTitleInput: this.props.jobTitle, companyInput: this.props.company, jobTitleLabel: "Current Job Title",
            companyLabel: "Current Company Name", updateWorkDisabled: true
        }
    }

    componentWillMount = () => {
        this.props.getUserInfo()
    }

    componentDidMount = () => {
        this.props.checkCookie()
        this.props.getUserInfo()
    }

    componentDidUpdate = () => {
        this.props.getUserInfo()
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

    setFullNamePasses = async () => this.setState({ ...this.state,  updateFullNameDisabled: ((this.state.firstNameInput == this.props.firstName) && (this.state.lastNameInput == this.props.lastName))}) 

    setWorkPasses = async () => this.setState({ ...this.state,  updateWorkDisabled: ((this.state.jobTitleInput == this.props.jobTitle) && (this.state.companyInput == this.props.company))}) 

    updateInput = async (evt, inputType) => this.setState({ ...this.state, [inputType]: evt.target.value }, () => this.validate(inputType))
    
    ensurePasswordIsCorrect = async () => this.props.validateCurrentPasswordInput(this.props.username, this.state.currentPasswordInput);

    validateCurrentPasswordInputLocal = async () => {
        this.state.currentPasswordInput.length > 0 ? this.ensurePasswordIsCorrect() : null
        setTimeout(() => this.generateCurrentPasswordInputLabel(), 250)
    }

    validateNewPassword = async () => {
        this.state.newPasswordInput.length > 0 ? this.ensureNewPasswordIsDifferent() : null
        await this.setNewPasswordInputLengthPasses()
        await this.setPasswordsMatch()
        setTimeout(() =>  this.generateNewPasswordInputLabel(), 250)
    }

    validateConfirmPassword = async () => {
        await this.setConfirmPasswordInputLengthPasses()
        await this.setPasswordsMatch()
        await this.generateConfirmPasswordInputLabel()
    }

    validateFirstName = async () => {
        await this.setFullNamePasses()
        await this.generateFirstNameLabel()
    }

    validateLastName = async () => {
        await this.setFullNamePasses()
        await this.generateLastNameLabel()
    }

    validateJobTitle = async () => {
        await this.setWorkPasses()
        await this.generateJobTitleLabel()
    }

    validateCompany = async () => {
        await this.setWorkPasses()
        await this.generateCompanyLabel()
    }

    validate = async inputType => {
         if (inputType == "currentPasswordInput"){ await this.validateCurrentPasswordInputLocal() } 
        else if (inputType == "newPasswordInput") { await this.validateNewPassword() } 
        else if (inputType == "confirmNewPasswordInput") { await this.validateConfirmPassword() }
        else if (inputType == "firstNameInput") { await this.validateFirstName() } 
        else if (inputType == "lastNameInput") { await this.validateLastName() } 
        else if (inputType == "companyInput") { await this.validateCompany() } 
        else if (inputType == "jobTitleInput") { await this.validateJobTitle() } 
    }

    generateFirstNameLabel = async () => {
        this.setState({ 
        ...this.state, firstNameInputLabel: this.props.firstName == this.state.firstNameInput ? "Current First Name" : 
                                           ((this.props.firstName !== this.state.firstNameInput) && this.state.firstNameInput.length > 0) ? 
                                           "looks great!" : "Edit your first name here."})
    }

    generateLastNameLabel = async () => {
        this.setState({ 
        ...this.state, lastNameInputLabel: this.props.lastName == this.state.lastNameInput ? "Current Last Name" : 
                                           ((this.props.lastName !== this.state.lastNameInput) && this.state.lastNameInput.length > 0) ? 
                                           "looks great!" : "Edit your last name here."})
    }

    generateCompanyLabel = async () => {
        this.setState({ 
        ...this.state, companyLabel: this.props.company == this.state.companyInput ? "Current Company Name" : 
                                           ((this.props.company !== this.state.companyInput) && this.state.companyInput.length > 0) ? 
                                           "looks great!" : "Edit Company Name Here."})
    }

    generateJobTitleLabel = async () => {
        this.setState({ 
        ...this.state, jobTitleLabel: this.props.jobTitle == this.state.jobTitleInput ? "Current Job Title" : 
                                           ((this.props.jobTitle !== this.state.jobTitleInput) && this.state.jobTitleInput.length > 0) ? 
                                           "looks great!" : "Edit Job Title Name Here."})
    }

    generateCurrentPasswordInputLabel = async () => {
        if (this.props.currentPasswordInputPasses) {
            this.setState({...this.state, currentPasswordInputLabel: "Correct!"})
        } else if(this.state.currentPasswordInput.length > 0 && !this.props.currentPasswordInputPasses) {
            this.setState({...this.state, currentPasswordInputLabel: "Not quite..."})
        } else if(this.state.currentPasswordInput.length < 1){
            this.setState({...this.state, currentPasswordInputLabel: "Type your current password"})
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
    
    handleFullNameUpdate = () => {
        this.props.updateFullName(this.props.user_id, this.state.firstNameInput, this.state.lastNameInput)
        setTimeout(() => {
            this.generateFirstNameLabel()
            this.generateLastNameLabel()
        }, 100)
    }

    handleWorkUpdate = () => {
        this.props.updateWork(this.props.user_id, this.state.companyInput, this.state.jobTitleInput)
        setTimeout(() => {
            this.generateCompanyLabel()
            this.generateJobTitleLabel()
        }, 100)
    }

    handlePasswordUpdate = () => {
        this.setState({...this.state, currentPasswordInput: "", newPasswordInput: "", confirmNewPasswordInput: "", newPasswordInputLabel: "Type your new password",
        confirmPasswordInputLabel: "Confirm your new password", currentPasswordInputLabel: "Type your current password"})
        this.props.updatePassword(this.props.username, this.state.currentPasswordInput, this.state.newPasswordInput)
    }
    
    render() {
        if(!this.props.username) {
            return <Redirect to="/" />
          } else {
            return(
            <main className="landing-page edit-profile-wrapper">
                <h3>Edit Profile</h3>
                <CardPanel className="card-panel">
                    <Row>
                        <Collapsible>
                        {/* FULL NAME UPDATE */}
                        <CollapsibleItem header="Full Name" left icon="face">
                                <Row>
                                    <Col s={12}>
                                        <Input 
                                        label={this.state.firstNameInputLabel} 
                                        s={12} 
                                        value={this.state.firstNameInput}
                                        onChange={evt => this.updateInput(evt, "firstNameInput")}>
                                        </Input>
                                    </Col>
                                    <Col s={12}>
                                        <Input 
                                        label={this.state.lastNameInputLabel} 
                                        s={12} 
                                        value={this.state.lastNameInput}
                                        onChange={evt => this.updateInput(evt, "lastNameInput")}>
                                        </Input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Button 
                                    s={12}
                                    onClick={() => this.handleFullNameUpdate()}
                                    disabled={this.state.updateFullNameDisabled}
                                    className="login-signup-submit-button">
                                        Update Full Name
                                        <Icon right>check</Icon>
                                    </Button>
                                </Row>
                            </CollapsibleItem>
                            {/* WORK UPDATE */}
                            <CollapsibleItem  header="Company/Title" left icon="work_outline">
                                <Row>
                                    <Col s={12}>
                                        <Input   
                                        label={this.state.jobTitleLabel} 
                                        s={12} 
                                        value={this.state.jobTitleInput}
                                        onChange={evt => this.updateInput(evt, "jobTitleInput")}>
                                        </Input>
                                    </Col>
                                    <Col s={12}>
                                        <Input   
                                        label={this.state.companyLabel} 
                                        s={12} 
                                        value={this.state.companyInput}
                                        onChange={evt => this.updateInput(evt, "companyInput")}>
                                        </Input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Button 
                                    s={12}
                                    onClick={() => this.handleWorkUpdate()}
                                    disabled={this.state.updateWorkDisabled}
                                    className="login-signup-submit-button">
                                        Update Work
                                        <Icon right>check</Icon>
                                    </Button>
                                </Row>
                            </CollapsibleItem>
                            {/* PASSWORD UPDATE */}
                            <CollapsibleItem header="Password" left icon="lock">
                                <Row>
                                    <Col s={12}>
                                        <Input 
                                        label={<span 
                                            className={this.state.currentPasswordInputLabel == "Correct!" ? 'success-text': null}>
                                            {this.state.currentPasswordInputLabel}{this.state.currentPasswordInput == "Correct!" ? <Icon>check</Icon> : null}
                                        </span>} 
                                        s={12} 
                                        value={this.state.currentPasswordInput}
                                        type="password"
                                        onChange={evt => this.updateInput(evt, "currentPasswordInput")}>
                                        </Input>

                                         <Input 
                                         disabled={this.state.currentPasswordInputLabel !== "Correct!"}
                                        label={<span 
                                            className={this.state.newPasswordInputLabel == "Looks good to us!" && this.state.newPasswordInput.length > 0 ? "success-text" : 
                                                       this.state.newPasswordInputLabel !== "Looks good to us!" && this.state.newPasswordInput.length > 0 ? "error-text" : null}>
                                              {this.state.newPasswordInputLabel}
                                              {this.state.newPasswordInputLabel == "Looks good to us!" ? <Icon>check</Icon> : null}
                                            </span>} 
                                        s={12} 
                                        value={this.state.newPasswordInput}
                                        type="password"
                                        onChange={evt => this.updateInput(evt, "newPasswordInput")}>
                                        </Input>

                                        <Input 
                                        disabled={this.state.newPasswordInputLabel !== "Looks good to us!"}
                                        label={<span 
                                                className={this.state.confirmPasswordInputLabel == "Match Confirmed!" && this.state.confirmNewPasswordInput.length > 0 ? "success-text" :
                                                           this.state.confirmPasswordInputLabel !== "Match Confirmed!" && this.state.confirmNewPasswordInput.length > 0  ? "error-text" : null}>
                                            {this.state.confirmPasswordInputLabel}
                                            {this.state.confirmPasswordInputLabel == "Match Confirmed!" ? <Icon>check</Icon> : null}
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
                                    disabled={this.state.confirmPasswordInputLabel != "Match Confirmed!" ||
                                              this.state.newPasswordInputLabel != "Looks good to us!" ||
                                              !this.props.currentPasswordInputPasses || !this.state.passwordsMatch}
                                        className="login-signup-submit-button">
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
        newPasswordInputPasses: state.auth.newPasswordInputPasses,
        user_id: state.auth.user_id,
        jobTitle: state.auth.jobTitle,
        company: state.auth.company
    }
  }
  
  const mapDispatchToProps = dispatch => {
      return bindActionCreators({
          updateUsername, 
          updatePassword,
          isUsernameTaken, 
          validateCurrentPasswordInput, 
          getUserInfo,
          updateFullName,
          updateWork,
          checkCookie,
          validateNewPasswordInput}, dispatch) 
    }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)    