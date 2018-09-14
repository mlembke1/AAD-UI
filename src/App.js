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

class App extends Component {
  componentDidMount(){
    this.props.checkCookie() 
  }


  render() {
        return (
          <BrowserRouter>
            <div className="app-body">
              <Header />
                <main className="app">
                  {
                  this.props.username ? 
                  <Route exact={true} path="/" component={Dashboard}  /> :
                  <Route exact={true} path="/" component={LandingPage} />
                  }
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
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
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({checkCookie}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
