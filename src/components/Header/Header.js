import React, { Component } from 'react';
import './Header.css';
import { connect } from 'react-redux'
import { Navbar, Icon, SideNav, SideNavItem, Modal, Button, Row, Col, Input } from 'react-materialize'
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
            usernameLabel: "Your Current Username"
        }
    }

    passwordsMatch = () => this.state.passwordInputValue === this.state.confirmPasswordInputValue
      
    setPasswordsMatch = () => this.setState({...this.state, passwordsMatch: this.passwordsMatch()})

    setPasswordLengthPasses = () => {
        return this.setState({
          ...this.state,
          passwordLengthPasses: this.state.passwordInputValue.length >= 8 && this.state.passwordInputValue.length <= 30 
        })
    }
    
    setConfirmPasswordLengthPasses = () => {
        return this.setState({
          ...this.state,
          confirmPasswordLengthPasses: this.state.confirmPasswordInputValue.length >= 8 && this.state.confirmPasswordInputValue.length <= 30 
        })
    } 

    setUsernameLengthPasses = () => {
        return this.setState({
          ...this.state,
          usernameLengthPasses: this.state.usernameInputValue.length >= 8 && this.state.usernameInputValue.length <= 30
        })
    } 

    updateInput(evt, inputType){
        return this.setState({...this.state, [inputType]: evt.target.value}, () => this.validateUsername())
    }

    setNoUsernameChange = () => this.setState({...this.state, noUsernameChange: this.props.username == this.state.usernameInputValue})
    
    validateUsername(){
        this.setNoUsernameChange()
        this.props.isUsernameTaken(this.state.usernameInputValue)   
        this.setUsernameLengthPasses()
        this.generateUsernameLabel()
    }

    generateUsernameLabel(){
        if(!this.props.usernameIsTaken && !this.state.noUsernameChange && this.state.usernameLengthPasses){
            console.log("Label should be 'Your new Username'")
            this.setState({...this.state, usernameLabel: "Your New Username" })
        } else if (this.props.usernameIsTaken && !this.state.noUsernameChange && this.state.usernameLengthPasses)  {
            console.log("Label should be 'username already taken'")
            this.setState({...this.state, usernameLabel: "Username Already Taken... Please try another."})
        }  else if (!this.noUsernameChange && !this.state.usernameLengthPasses) {
            console.log("Label should be '8-30'")
            this.setState({...this.state, usernameLabel: "Username must be between 8-30 characters."})
        } else if (this.state.noUsernameChange) {
            console.log("Label should be 'Your Current Username'")
            this.setState({...this.state, usernameLabel: "Your Current Username."})
        }                  
    }

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
                                header='Edit Profile'
                                trigger={<Button className="edit-profile-button">Edit Profile</Button>}>
                                <Row>
                                    <Col s={6}>
                                        <Input 
                                        label={this.state.usernameLabel} 
                                        s={12} 
                                        value={this.state.usernameInputValue}
                                        onChange={evt => this.updateInput(evt, "usernameInputValue")}>
                                        </Input>
                                    </Col>
                                    <Col s={6}>
                                    
                                    </Col>
                                </Row>
                                <Row>
                                    <Button>
                                        Update
                                    </Button>
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