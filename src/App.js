import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkCookie } from './actions/checkCookie'
import  Dashboard from './components/Dashboard/Dashboard'
import  LandingPage from './components/LandingPage/LandingPage'
import  Header from './components/Header/Header'
import  PageFooter from './components/PageFooter/PageFooter'
import { BrowserRouter, Route } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import { Redirect } from 'react-router-dom'

class App extends Component {
  componentWillMount(){
    this.props.checkCookie() 
  }

  
  render() {
    return (
          <BrowserRouter>
            <div className="app-body">
              <Header />
                <main className="app">  
                  <Route exact path="/" render={() => {
                      this.props.checkCookie()
                      debugger 
                      return this.props.username ? <Redirect to="/dashboard" /> : <LandingPage />
                  }} /> 
                  <Route exact path="/dashboard" render={() => {
                      this.props.checkCookie()
                      debugger 
                      return (!this.props.username && !this.props.toDash) ? <Redirect to="/" /> : <Dashboard />
                  }} />
                  <Route exact path="/login" render={() => {
                      this.props.checkCookie()
                      debugger 
                      return this.props.username || this.props.toDash ? <Redirect to="/dashboard" /> : <Login />
                  }} />
                  <Route exact path="/signup" render={() => {
                      this.props.checkCookie()
                      debugger 
                      return this.props.username || this.props.toDash ? <Redirect to="/dashboard" /> : <Signup />
                  }} />
                </main>
              <PageFooter />
            </div>
          </BrowserRouter>
        )      
  }
}


const mapStateToProps = state => {
  return {
      username: state.auth.username,
      toDash: state.auth.toDash,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({checkCookie}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
