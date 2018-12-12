import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Stats.css';
import { bindActionCreators } from 'redux'
import { authenticate } from '../../actions/authenticate'
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
    this.props.authenticate()
    this.props.getUserInfo().then(r => this.props.setPermissions(r.payload.role)) 
    this.props.getAnswers(this.state.selectedToolResults, this.props.sortoeQuestions)
  }

    

  render() {
    if(!this.props.username){
      return <Redirect to="/" />
    } else {
      return (
        <div>
          {/* HEADER */}
          <Row className="valign-wrapper"> 
            <Col s={9}>
              <SubHeader icon={require("../../assets/stats_icon.png")} subHeader="The Stats"/>
            </Col>
            <Col s={3} className="margin-right">
              <Input s={12} type='select' onChange={evt => this.setState({selectedToolResults: evt.target.value})} label="Choose Tool Results" >
                <option value='MEADE/SORT-OE'> MEADE/SORT-OE</option>
                <option value='ARGUMENT MAPPER'> ARGUMENT MAPPER</option>
              </Input>
            </Col>
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
                  Object.keys(this.props.allAnswers).map((answerObjectKey, i) => (
                    <Row key={i} className="height-100">
                      <Col>
                       <h6>{this.props.sortoeQuestions[i].questionID}. {this.props.sortoeQuestions[i].question}</h6>
                      </Col>
                       <Chart answerObject={this.props.allAnswers[answerObjectKey]}/>

                    </Row>
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

const mapDispatchToProps = dispatch => bindActionCreators({authenticate, getUserInfo, setPermissions, getAnswers}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Stats)