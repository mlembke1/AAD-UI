import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkCookie } from './actions/checkCookie'
import  Dashboard from './components/Dashboard/Dashboard'
import  LandingPage from './components/LandingPage/LandingPage'
import  Header from './components/Header/Header'
import  PageFooter from './components/PageFooter/PageFooter'
import  Portal from './components/Portal/Portal'
import  Reviews from './components/Reviews/Reviews'
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
                    return this.props.username ? <Redirect to="/dashboard" /> : <LandingPage />
                  }} /> 
                  <Route exact path="/dashboard" render={() => {
                    return !this.props.username ? <Redirect to="/" /> : <Dashboard />
                  }} />
                  <Route exact path="/login" render={() => {
                    return this.props.username ? <Redirect to="/dashboard" /> : <Login />
                  }} />
                  <Route exact path="/signup" render={() => {
                    return this.props.username ? <Redirect to="/dashboard" /> : <Signup />
                  }} />
                  <Route exact path="/portal" render={() => {
                    return !this.props.username ? <Redirect to="/" /> : <Portal />
                  }} />
                  <Route exact path="/reviews" render={() => {
                    return !this.props.username ? <Redirect to="/" /> : <Reviews />
                  }} />
                  <Route exact path="/sortoe" render={() => {
                    localStorage.setItem('sortoeUser', JSON.stringify({
                      active: true,
                      admin: true,
                      authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MzkyNzEzMjcsIm5iZiI6MTUzOTI3MTMyNywianRpIjoiYTM0YzlkMmEtN2U1Ni00ZDI3LWFhMWMtZTA3MGM0MGMwMGRmIiwiZXhwIjoxNTM5MzU3NzI3LCJpZGVudGl0eSI6MSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.KdFxim0Al_FT3s0pAi6hgJ0sFzo2NrPOj6bWPXE5YdE",
                      email: "test1@acme.com",
                      firstName: "Admin",
                      id: 1,
                      lastName: "admin",
                      organization: "testorg",
                      username: "admin"
                    }))
                    window.location = 'https://sortoe.supermicro5.opswerx.org/'
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
      username: state.auth.username
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({checkCookie}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
