import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Stats.css';
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
import { getUserInfo } from '../../actions/getUserInfo'
import { Row } from 'react-materialize'
import { Redirect } from 'react-router-dom'
import SubHeader from '../SubHeader/SubHeader'


class Stats extends Component {
  componentWillMount(){
    this.props.checkCookie()
    this.props.getUserInfo()
  }

  render() {
    if(!this.props.username){
      return <Redirect to="/" />
    } else {
      return (
        <div>
          {/* HEADER */}
          <SubHeader icon={require("../../assets/stats_icon.png")} subHeader="The Stats"/>
          <Row>
              Show some stats here!
          </Row>
        </div>
      )
    }
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
      allTools: state.tools.allTools
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({checkCookie, getUserInfo}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Stats)