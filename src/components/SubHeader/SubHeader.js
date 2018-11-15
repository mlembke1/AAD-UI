import React, { Component } from 'react';
import './SubHeader.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
import { getUserInfo } from '../../actions/getUserInfo'
import { Row, Col, Section } from 'react-materialize'
import { Redirect } from 'react-router-dom'



class SubHeader extends Component {

    componentWillMount(){
        this.props.checkCookie()
        this.props.getUserInfo()
    }
    
    render() {
    if(!this.props.username) {
      return <Redirect to="/" />
    } else {
      return (
        <Section className="dash-heading-wrapper">
        <Row> 
          <Col s={12}>
          </Col>
        </Row>
        <Row className='center valign-wrapper'>
          <Col s={1}>
            <img src={this.props.icon} width="70px" />
          </Col>
          <Col s={1}>
            <h5 className="dash-username j-title">{this.props.subHeader}</h5>
          </Col>
          <Col s={10}></Col>
        </Row>
        <Row>
          <Col s={12}>
            <hr className="thick-line-blue" />
          </Col>
        </Row>
      </Section> 
      )
    }
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({checkCookie, getUserInfo}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader)
