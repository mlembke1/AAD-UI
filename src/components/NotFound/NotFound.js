import React, { Component } from 'react';
import './NotFound.css';
import { connect } from 'react-redux'

class NotFound extends Component {
    
    render() {
    return (
            <main className="landing-page not-found-wrapper">
                <h3>Page not found.</h3>
            </main>
        )
    }
  }

export default connect(null, null)(NotFound)