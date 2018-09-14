import React, { Component } from 'react';
import './Signup.css';
import { connect } from 'react-redux'
import Header from '../Header/Header'
import PageFooter from '../PageFooter/PageFooter'
import { Row, Input } from 'react-materialize'
class Signup extends Component {

  render() {
    return (
      <main>
        <Row>
            <Input placeholder="Placeholder" s={6} label="First Name" />
            <Input s={6} label="Last Name" />
            <Input s={12} label="disabled" defaultValue="I am not editable" disabled />
            <Input type="password" label="password" s={12} />
            <Input type="email" label="Email" s={12} />
        </Row>
       </main> 
    )
  }
}


export default connect(null, null)(Signup)