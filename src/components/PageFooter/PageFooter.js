import React, { Component } from 'react';
import './PageFooter.css';
import { connect } from 'react-redux'


class PageFooter extends Component {

  render() {
        return (
            <div id="footer"></div>
        )
    }
  }


export default connect(null, null)(PageFooter)