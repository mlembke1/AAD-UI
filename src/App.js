import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkCookie } from './actions/checkCookie'
import  Dashboard from './components/Dashboard/Dashboard'
import  LandingPage from './components/LandingPage/LandingPage'
import  Signup from './components/Signup/Signup'
import  Login from './components/Login/Login'
import { Route } from 'react-router-dom'

class App extends Component {
  componentDidMount(){
    this.props.checkCookie() 
  }

  render() {
      if (this.props.username) {
        return (
          <div> 
            <Dashboard />
          </div>
        )
      } else {
        return (
          <div> 
              <Route exact path='/' component={LandingPage}/>
              <Route path='/signup' component={Signup}/>
              <Route path='/login' component={Login}/>
              {/* <LandingPage /> */}
          </div>
        )
    }
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({checkCookie}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
