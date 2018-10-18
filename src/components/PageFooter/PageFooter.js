import React, { Component } from 'react';
import './PageFooter.css';
import { connect } from 'react-redux'
import { Navbar } from 'react-materialize'


class PageFooter extends Component {

  render() {
        return (
            <div id="footer"></div>
        )
    }
  }


export default connect(null, null)(PageFooter)