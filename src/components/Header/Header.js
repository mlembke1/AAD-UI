import React, { Component } from 'react';
import './Header.css';
import { connect } from 'react-redux'
import { Navbar, Icon, SideNav, SideNavItem, Modal, Button, Row, Col, Input, Collapsible, CollapsibleItem } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/logout'
import { updateUsername } from '../../actions/updateUsername'
import { isUsernameTaken } from '../../actions/isUsernameTaken'

class Header extends Component {

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
            updateProfileDisabled: true, 
            usernameAlreadyTaken: this.props.usernameIsTaken
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
            this.setState({...this.state, usernameLabel: "Your New Username", updateProfileDisabled: false})
        } else if (this.props.usernameIsTaken && !this.state.noUsernameChange && this.state.usernameLengthPasses)  {
            this.setState({...this.state, usernameLabel: "Username Already Taken... Please try another.", updateProfileDisabled: true})
        }  else if (!this.state.noUsernameChange && !this.state.usernameLengthPasses) {
            this.setState({...this.state, usernameLabel: "Username must be between 8-30 characters.", updateProfileDisabled: true})
        } else if (this.state.noUsernameChange) {
            this.setState({...this.state, usernameLabel: "Your Current Username.", updateProfileDisabled: true})
        }                  
    }

    handleUsernameUpdate = () => this.props.updateUsername(this.props.username, this.state.usernameInputValue)

    render() {
    if (this.props.username) {
        return (
            <Navbar className="navbar-logo" brand={<span className="valign-wrapper sof-aad-header">SOF AAD</span>} right>
                <div>
                    <SideNav
                        id="logged-in-nav"
                        trigger={<div className="valign-wrapper hamburger-menu-icon-container">
                                    <span className="uppercase">{this.props.firstName} {this.props.lastName}</span>
                                    <Icon className="hamburger">menu</Icon>
                                </div>}
                        options={{ closeOnClick: true, edge: "right" }}>
                        <SideNavItem className="border-bottom width-50" waves>
                            <Link className="link" to="/"> Home </Link>
                        </SideNavItem>
                        <SideNavItem className="border-bottom" waves>
                            <Link className="link" to="/portal"> Portal </Link>
                        </SideNavItem>
                        <SideNavItem className="border-bottom" waves>
                            <Link className="link" to="/reviews"> My Assessments </Link>
                        </SideNavItem>
                        <SideNavItem className="border-bottom" waves>
                            <Link className="link" to="/public"> Public Reviews </Link>
                        </SideNavItem>
                        <SideNavItem className="border-bottom width-50" waves>
                            <Modal
                            className="edit-profile-modal"
                                header='Edit Profile'
                                trigger={<Button className="edit-profile-button">Edit Profile</Button>}>
                                <Row>
                                    <Collapsible>
                                        <CollapsibleItem header="Username" right icon="edit">
                                            <Row>
                                                <Col s={12}>
                                                    <Input   
                                                    className={this.state.updateProfileDisabled ? "margin-top-10" : null}                                        label={this.state.usernameLabel} 
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
                                                disabled={this.state.updateProfileDisabled}className="login-signup-submit-button">
                                                    Update Username
                                                    <Icon right>check</Icon>
                                                </Button>
                                            </Row>
                                        </CollapsibleItem>
                                    </Collapsible>
                                </Row>
                            </Modal>
                        </SideNavItem>
                        <SideNavItem className="width-50" onClick={() => this.props.logout()} waves>
                            <Link className="link" to="/"> Logout </Link>
                        </SideNavItem>
                    </SideNav>
                </div>
            </Navbar>   
        )
      } else {
        return (
            <Navbar className="navbar-logo" brand={<span className="sof-aad-header valign-wrapper">SOF AAD</span>} right>
                <SideNav
                    id="logged-out-nav"
                    trigger={<div className="hamburger-menu-icon-container"><Icon className="hamburger">menu</Icon></div>}
                    options={{ closeOnClick: true, edge: "right" }}>
                    <SideNavItem className="border-bottom">
                        <Link className="link" to="/login"> Login </Link>
                    </SideNavItem>
                    <SideNavItem>
                        <Link className="link" to="/signup"> Signup </Link>
                    </SideNavItem>
                </SideNav>
            </Navbar>
        )
      }
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

const mapDispatchToProps = dispatch => bindActionCreators({logout, updateUsername, isUsernameTaken}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Header)