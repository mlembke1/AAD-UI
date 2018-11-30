import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Stats.css';
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
import { getAnswers } from '../../actions/getAnswers'
import { setPermissions } from '../../actions/setPermissions'
import { getUserInfo } from '../../actions/getUserInfo'
import { Row, Input, Col, ProgressBar } from 'react-materialize'
import { Redirect } from 'react-router-dom'
import SubHeader from '../SubHeader/SubHeader'
import Chart from '../Chart/Chart'


class Stats extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedToolResults: "MEADE/SORT-OE", 
      allAnswers: this.props.allAnswers
    }
  }

  componentWillMount(){
    this.props.checkCookie()
    this.props.getUserInfo()
    setTimeout(() => this.props.setPermissions(this.props.role), 300) 
    this.props.getAnswers(this.state.selectedToolResults, this.props.sortoeQuestions)
  }

    

  render() {
    if(!this.props.username){
      return <Redirect to="/" />
    } else {
      return (
        <div>
          {/* HEADER */}
          <SubHeader icon={require("../../assets/stats_icon.png")} subHeader="The Stats"/>
          <Row className="margin-left"> 
            <Col s={3}>
              <Input s={12} type='select' onChange={evt => this.setState({selectedToolResults: evt.target.value})} label="Choose Tool Results" >
                <option value='MEADE/SORT-OE'> MEADE/SORT-OE</option>
                <option value='ARGUMENT MAPPER'> ARGUMENT MAPPER</option>
              </Input>
            </Col>
            <Col s={9}></Col>
          </Row> 
          <Row>
            { 
              !this.props.getAnswersComplete ?
              <Row className="margin-top">
                <Col s={4}></Col>
                <Col s={4}>
                    <ProgressBar /> 
                </Col>
                <Col s={4}></Col>
              </Row>
              :
                !this.props.allAnswers || Object.keys(this.props.allAnswers).length < 1 || this.state.selectedToolResults !== "MEADE/SORT-OE"?
                  <Row>
                    <Col s={3}></Col>
                    <Col s={6}>
                      <h5 className="font-300">No {this.state.selectedToolResults} Statistics Available Yet.</h5>
                    </Col>
                    <Col s={3}></Col>
                  </Row> 
                  :
                  Object.keys(this.props.allAnswers).map(answerObjectKey => (
                    <div className="height-100">
                      <h6>{this.props.allAnswers[answerObjectKey].questionID}. {this.props.allAnswers[answerObjectKey].question}</h6>
                      <Chart answerObject={this.props.allAnswers[answerObjectKey]}/>
                    </div>
                  )) 
              }
          </Row>
        </div>
      )
    }
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
      allTools: state.tools.allTools, 
      role: state.auth.role,
      sortoeQuestions: state.reviews.sortoeQuestions, 
      allAnswers: state.reviews.allAnswers, 
      getAnswersComplete: state.reviews.getAnswersComplete
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({checkCookie, getUserInfo, setPermissions, getAnswers}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Stats)