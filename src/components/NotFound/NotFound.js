import React, { Component } from 'react';
import './NotFound.css';
import { connect } from 'react-redux'
import { Navbar } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/logout'


class NotFound extends Component {
    
    render() {
    return (
            <main className="landing-page not-found-wrapper">
                <h3>Page not found.</h3>
            </main>
        )
    }
  }


const mapStateToProps = state => {
  return {
      username: state.auth.username,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(NotFound)