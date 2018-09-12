import React, { Component } from 'react';
import './Signup.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '../Header/Header'
import PageFooter from '../PageFooter/PageFooter'


class Signup extends Component {

  render() {
    return (
      <body>
        <Header />
            
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

export default connect(mapStateToProps, null)(Signup)