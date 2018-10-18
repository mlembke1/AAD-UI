import React, { Component } from 'react';
import './LandingPage.css';
import { connect } from 'react-redux'
import { Button } from 'react-materialize'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'

class LandingPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      typingIsFinished: false
    }
  }

  componentWillMount(){
    this.props.checkCookie()
  }

  componentDidMount () {
    setTimeout(() => {
      this.typeWriter()
    }, 600)
  }

  typeWriter = async () => {
    let i = 0;
    const txt = 'Test tools. Give Feedback. Move Forward.'; /* The text */
    const speed = 60; /* The speed/duration of the effect in milliseconds */
    
    const type = async () =>  {
      if (i < txt.length) {
        document.getElementById("typing").innerHTML += txt.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        await enableButtons()
      }
    }

    const enableButtons = async () => {
      return this.setState({
        ...this.state,
          typingIsFinished: true
      })
    }

    type()

    
  }


  render() {
        return (
          <main className="landing-page">
            <div id="aad-title-container">
              <div className="aad-title">ADVANCED</div>
              <div className="aad-title">ANALYTIC</div>
              <div className="aad-title">DEMONSTRATOR</div>
            </div>
  
            <div className="typewriter" id="aad-paragraph">
              <h5 id="typing"></h5>
            </div>
  
            <div id="signup-login-buttons-container">
              <Link to="/signup">
                <Button disabled={!this.state.typingIsFinished} large={true} className="signup-login-buttons" waves='light'>Signup</Button>
              </Link>
              <Link to="/login">
                <Button disabled={!this.state.typingIsFinished} large={true} className="signup-login-buttons" waves='light'>Login</Button> 
              </Link>
            </div>
          </main>         
        )
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