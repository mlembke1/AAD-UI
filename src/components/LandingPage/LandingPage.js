import React, { Component } from 'react';
import './LandingPage.css';
import { connect } from 'react-redux'
import { Button } from 'react-materialize'
import { Link, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'

class LandingPage extends Component {

  componentWillMount(){
    this.props.checkCookie()
  }


  render() {
    if(this.props.username){
      return <Redirect to="/dashboard" />
    } else {
        return (
          <main className="landing-page">
            <div id="aad-title-container">
              <div className="aad-title">ADVANCED</div>
              <div className="aad-title">ANALYTIC</div>
              <div className="aad-title">DEMONSTRATOR</div>
            </div>
  
            <div className="typewriter" id="aad-paragraph">
              <h5 id="typing">
              Test tools. Give Feedback. Move Forward.
              </h5>
            </div>
            <div id="signup-login-buttons-container">
              <Link to="/signup">
                <Button  large={true} className="signup-login-buttons" waves='light'>Signup</Button>
              </Link>
              <Link to="/login">
                <Button  large={true} className="signup-login-buttons" waves='light'>Login</Button> 
              </Link>
            </div>
          </main>         
        )
    }
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
      toDash: state.auth.toDash
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({checkCookie}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)