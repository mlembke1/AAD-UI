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
import { RadioButton, RadioGroup } from '@trendmicro/react-radio';
import '@trendmicro/react-radio/dist/react-radio.css';



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

      handleChangeByKey = (key) => (value, event) => {
          this.setState({ [key]: value }, () => {
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
        <Row>
            <Col s={6}>
                { 
                    firstHalf.map((question, i) => {
                    return (
                        <Row className="border-bottom-questions">
                            <h6 className="left-align">{question.questionID}. {question.question}</h6>
                            <RadioGroup
                                name={question.questionID}
                                value={this.state[`question${question.questionID}Answer`]}
                                depth={3} // This is needed to minimize the recursion overhead
                                onChange={this.handleChangeByKey(`question${question.questionID}Answer`)}
                            >
                            {
                                question.answers.map(answer => {
                                    return (
                                            <RadioButton className="radio-button" label={answer} value={answer} />
                                    )
                                })
                            }
                            </RadioGroup>
                        </Row>
                    )
                    })
                }
            </Col>
            <Col s={6}>
                { 
                    secondHalf.map((question, i) => {
                    return (
                        <Row className="border-bottom-questions">
                            <h6 className="left-align">{question.questionID}. {question.question}</h6>
                            <RadioGroup
                                name={question.questionID}
                                value={this.state[`question${question.questionID}Answer`]}
                                depth={3} // This is needed to minimize the recursion overhead
                                onChange={this.handleChangeByKey(`question${question.questionID}Answer`)}
                            >
                            {
                                question.answers.map(answer => {
                                    return (
                                            <RadioButton className="radio-button" label={answer} value={answer} />
                                    )
                                })
                            }
                            </RadioGroup>
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
