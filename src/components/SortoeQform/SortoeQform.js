import React, { Component } from 'react';
import './SortoeQform.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
import { setSortoeAnswerInputs } from '../../actions/setSortoeAnswerInputs'
import { setAllQuestionsAreIndifferent } from '../../actions/setAllQuestionsAreIndifferent'
import { getUserInfo } from '../../actions/getUserInfo'
import { Row, Col, Input } from 'react-materialize'
import { Redirect } from 'react-router-dom'

class SortoeQform extends Component {

    constructor(props) {
        super(props)
        this.state = {
            question1Answer: "Indifferent",
            question2Answer: "Indifferent",
            question3Answer: "Indifferent",
            question4Answer: "Indifferent",
            question5Answer: "Indifferent",
            answersAreAllIndifferent: true
        }
    }

    componentWillMount(){
        this.props.checkCookie()
        this.props.getUserInfo()
    }

    handleAreQuestionsAnswered = () => {
        return this.state.question1Answer == "Indifferent"  &&
               this.state.question2Answer == "Indifferent"  &&
               this.state.question3Answer == "Indifferent"  &&
               this.state.question4Answer == "Indifferent"  && 
               this.state.question5Answer == "Indifferent"  ? 
               this.props.setAllQuestionsAreIndifferent(true)
               : 
               this.props.setAllQuestionsAreIndifferent(false)
    }

      handleChangeByKey = (e, key) => {
          this.setState({ [key]: e.target.value }, () => {
            let stateCopy = { ...this.state }
            delete stateCopy['answersAreAllIndifferent'];
            this.props.setSortoeAnswerInputs(stateCopy)
            this.handleAreQuestionsAnswered()
          } )
    };
    
    render() {
    let halfWayThrough = Math.ceil(this.props.sortoeQuestions.length / 2)
    let firstHalf = this.props.sortoeQuestions.slice(0, halfWayThrough)
    let secondHalf = this.props.sortoeQuestions.slice(halfWayThrough, this.props.sortoeQuestions.length)
    if(!this.props.username) {
      return <Redirect to="/" />
    } else {
      return (
        <Row className="background-light-grey">
            <Col s={6}>
                { 
                    firstHalf.map((question, i) => {
                    return (
                        <Row className={`no-bottom-margin valign-wrapper min-width-100 ${i == firstHalf.length -1 ? null: "border-bottom-light"}`}>
                            <Col className="uppercase-light-font" s={1}><span className="bold">{question.questionID}</span></Col>
                            <Col s={6}>
                                <span className="uppercase-light-font">{question.question}</span>
                            </Col>
                            <Col s={5}>
                                <Input 
                                s={12} 
                                type='select' 
                                value={this.state[`question${question.questionID}Answer`]}
                                onChange={evt => this.handleChangeByKey(evt, `question${question.questionID}Answer`)}>
                                    <option value='Strongly Disagree'>Strongly Disagree</option>
                                    <option value='Disagree'>Disagree</option>
                                    <option value='Indifferent'>Indifferent</option>
                                    <option value='Agree'>Agree</option>
                                    <option value='Strongly Agree'>Strongly Agree</option>
                                </Input>
                            </Col> 
                        </Row>
                    )
                    })
                }
            </Col>
            <Col s={6}>
                { 
                    secondHalf.map((question, i) => {
                    return (
                        <Row className={`no-bottom-margin valign-wrapper min-width-100 ${i == firstHalf.length -1 ? null: "border-bottom-light"}`}>
                            <Col className="uppercase-light-font" s={1}><span className="bold">{question.questionID}</span></Col>
                            <Col s={6}>
                                <span className="uppercase-light-font">{question.question}</span>
                            </Col>
                            <Col s={5}>
                                <Input 
                                s={12} 
                                type='select' 
                                value={this.state[`question${question.questionID}Answer`]}
                                onChange={evt => this.handleChangeByKey(evt,`question${question.questionID}Answer`)}>
                                    <option value='Strongly Disagree'>Strongly Disagree</option>
                                    <option value='Disagree'>Disagree</option>
                                    <option value='Indifferent'>Indifferent</option>
                                    <option value='Agree'>Agree</option>
                                    <option value='Strongly Agree'>Strongly Agree</option>
                                </Input>
                            </Col> 
                        </Row>
                    )
                    })
                }
            </Col>
        </Row>     
      )
    }
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
      sortoeQuestions: state.reviews.sortoeQuestions
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({checkCookie, getUserInfo, setAllQuestionsAreIndifferent, setSortoeAnswerInputs}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SortoeQform)
