import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '../Header/Header'


class Dashboard extends Component {

  render() {
    return (
      <div>
        <Header />
        <div>Woo Hoo! {this.props.username}! You made it to your dashboard! </div>
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
  }
}

// const mapDispatchToProps = dispatch => bindActionCreators({checkCookie}, dispatch)

export default connect(mapStateToProps, null)(Dashboard)
