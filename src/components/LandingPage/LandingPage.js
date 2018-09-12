import React, { Component } from 'react';
import './LandingPage.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '../Header/Header'
import PageFooter from '../PageFooter/PageFooter'


class LandingPage extends Component {

  render() {
    return (
      <body>
        <Header />
          <main>
            <div>Welcome to AAD! </div>
          </main> 
        <PageFooter />
       </body> 
    )
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
  }
}

// const mapDispatchToProps = dispatch => bindActionCreators({checkCookie}, dispatch)

export default connect(mapStateToProps, null)(LandingPage)