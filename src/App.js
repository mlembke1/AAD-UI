import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkCookie } from './actions/checkCookie'

class App extends Component {
  componentDidMount(){
    const options = {
        method: 'POST',
        body: JSON.stringify({
          signupUsername: "mlembke1345",
          signupEmail: "mlembke1345@mail.com",
          signupPassword: "mlembke1345Pass"
        }),
        credentials: 'include',
        headers:{
          'Content-Type': 'application/json'
        }
    }
    fetch("http://localhost:3000/signup", options)
    .then(response => {
      return response.json()
    })
    .catch(err => console.log('whoops, there was this error:', err))

    setTimeout(() => {
      this.props.checkCookie(document.cookie)
      console.log(this.props.hasCookie)
    }, 5000)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
      hasCookie: state.auth.hasCookie,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({checkCookie}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
