import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkCookie } from './actions/checkCookie'
import { setPermissions } from './actions/setPermissions'
import { getUserInfo } from './actions/getUserInfo'
import  Dashboard from './components/Dashboard/Dashboard'
import  LandingPage from './components/LandingPage/LandingPage'
import  Header from './components/Header/Header'
import  PageFooter from './components/PageFooter/PageFooter'
import  Portal from './components/Portal/Portal'
import  Reviews from './components/Reviews/Reviews'
import  PublicReviews from './components/PublicReviews/PublicReviews'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound'
import Stats from './components/Stats/Stats'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

class App extends Component {

  componentWillMount(){
    this.props.checkCookie()
    this.props.getUserInfo()
    setTimeout(()  => this.props.setPermissions(this.props.role), 300)
  }
  
  render() {
    return (
          <BrowserRouter>
          <Route render={({ location }) => (
            <div className="app-body">
              <Header />
                <main className="app">  
                <TransitionGroup>
                  <CSSTransition
                  timeout={300}
                  classNames="fade"
                  key={location.key}
                  >
                  <Switch location={location}>
                    <Route exact path="/" component={LandingPage} /> 
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/portal" component={Portal} />
                    <Route path="/reviews" component={Reviews} />
                    <Route path="/public" component={PublicReviews} />
                    <Route path="/stats" component={Stats} />
                    <Route component={NotFound}/>
                  </Switch>
                  </CSSTransition>
                </TransitionGroup>
                </main>
              <PageFooter />
            </div>
          )}/>
          </BrowserRouter>
        )      
  }
}


const mapStateToProps = state => {
  return {
      username: state.auth.username,
      role: state.auth.role
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({checkCookie, getUserInfo, setPermissions}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
