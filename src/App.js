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
                  <Route exact path="/" component={LandingPage} /> 
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/portal" component={Portal} />
                  <Route path="/reviews" component={Reviews} />
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
