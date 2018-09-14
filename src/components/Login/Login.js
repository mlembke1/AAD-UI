import React, { Component } from 'react';
import './Login.css';
import { connect } from 'react-redux'
import Header from '../Header/Header'
import PageFooter from '../PageFooter/PageFooter'
import { Row, Input } from 'react-materialize'

class Login extends Component {

  render() {
    return (
      <main>
        {/* <Header /> */}
            <Row>
                <Input placeholder="Username" s={6} label="Username" />
                <Input s={6} placeholder="Password" label="Password" />
            </Row>
        {/* <PageFooter /> */}
       </main> 
    )
  }
}


export default connect(null, null)(Login)