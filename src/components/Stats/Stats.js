import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Stats.css';
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
import { getAnswers } from '../../actions/getAnswers'
import { setPermissions } from '../../actions/setPermissions'
import { getUserInfo } from '../../actions/getUserInfo'
import { Row, Input, Col } from 'react-materialize'
import { Redirect } from 'react-router-dom'
import SubHeader from '../SubHeader/SubHeader'
import Chart from '../Chart/Chart'


class Stats extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedToolResults: "MEADE/SORT-OE"
    }
  }

  componentWillMount(){
    this.props.checkCookie()
    this.props.getUserInfo()
    setTimeout(() => this.props.setPermissions(this.props.role), 300) 
    this.props.getAnswers(this.state.selectedToolResults)
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
              this.props.sortoeQuestions.map(question => (
                <div className="height-100">
                  <h6>{question.questionID}. {question.question}</h6>
                  <Chart />
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
      sortoeQuestions: state.reviews.sortoeQuestions
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({checkCookie, getUserInfo, setPermissions, getAnswers}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Stats)