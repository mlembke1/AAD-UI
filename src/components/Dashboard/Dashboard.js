import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'


class Dashboard extends Component {

  render() {
    return (
      <div>
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
