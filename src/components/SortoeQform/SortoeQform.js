import React, { Component } from 'react';
import './SortoeQform.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
import { setAllQuestionsAreAnswered } from '../../actions/setAllQuestionsAreAnswered'
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
        }
    }

    componentWillMount(){
        this.props.checkCookie()
        this.props.getUserInfo()
    }

    handleAreQuestionsAnswered = () => {
        return this.state.question1Answer.length == "Indifferent"  &&
               this.state.question2Answer.length == "Indifferent"  &&
               this.state.question3Answer.length == "Indifferent"  &&
               this.state.question4Answer.length == "Indifferent"  && 
               this.state.question5Answer.length == "Indifferent"  ? 
               this.props.setAllQuestionsAreAnswered(false)
               : 
               this.props.setAllQuestionsAreAnswered(true)
    }

    updateInputValue = (evt, inputType) => {
        console.log('CHANGING THINGS')
        this.setState({[inputType]: evt.target.value}, () => this.handleAreQuestionsAnswered())
      }

      handleChangeByKey = (key) => (value, event) => {
          this.setState({ [key]: value }, () => this.handleAreQuestionsAnswered())
    };
    
    render() {
    if(!this.props.username) {
      return <Redirect to="/" />
    } else {
      return (
        <Row>
            { this.props.sortoeQuestions.map((question, i) => {
                return (
                    <Row className="border-bottom-questions">
                        <h6 className="left-align">{i+1}. {question.question}</h6>
                        <RadioGroup
                            name={question.questionID}
                            value={this.state[`question${question.questionID}Answer`]}
                            depth={3} // This is needed to minimize the recursion overhead
                            onChange={this.handleChangeByKey(`question${question.questionID}Answer`)}
                        >
                        {
                            question.answers.map(answer => {
                                return (
                                    <Col className="margin" s={12/question.answers.length}>
                                        <RadioButton label={answer} value={answer} />
                                        {/* <Input
                                        required
                                        onChange={evt => this.updateInputValue(evt, `question${question.questionID}Answer`)}
                                        className="signup-input"
                                        type={question.type}
                                        name={question.questionID}
                                        label={answer}
                                        value={answer}
                                        checked={answer == this.state[`question${question.questionID}Answer`]}
                                        s={12} /> */}
                                    </Col>
                                )
                            })
                        }
                        </RadioGroup>
                    </Row>
                )
                })
            }
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

const mapDispatchToProps = dispatch => bindActionCreators({checkCookie, getUserInfo, setAllQuestionsAreAnswered}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SortoeQform)
