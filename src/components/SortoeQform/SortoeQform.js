import React, { Component } from 'react';
import './SortoeQform.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
import { setAllQuestionsAreAnswered } from '../../actions/setAllQuestionsAreAnswered'
import { getUserInfo } from '../../actions/getUserInfo'
import { Row, Col, Input } from 'react-materialize'
import { Redirect } from 'react-router-dom'



class SortoeQform extends Component {

    constructor(props) {
        super(props)
        this.state = {
            question1Answer: "",
            question2Answer: "",
            question3Answer: "",
            question4Answer: "",
            question5Answer: "",
        }
    }

    componentWillMount(){
        this.props.checkCookie()
        this.props.getUserInfo()
    }

    handleAreQuestionsAnswered = () => {
        return this.state.question1Answer.length > 0 &&
               this.state.question2Answer.length > 0 &&
               this.state.question3Answer.length > 0 &&
               this.state.question4Answer.length > 0 && 
               this.state.question5Answer.length > 0 ? 
               this.props.setAllQuestionsAreAnswered(true)
               : 
               this.props.setAllQuestionsAreAnswered(false)
    }

    updateInputValue = (evt, inputType) => {
        this.setState({[inputType]: evt.target.value}, () => this.handleAreQuestionsAnswered())
      }
    
    render() {
    if(!this.props.username) {
      return <Redirect to="/" />
    } else {
      return (
        <Row>
            { this.props.sortoeQuestions.map(question => {
                return (
                    <Row className="border-bottom-questions">
                        <h6>{question.question}</h6>
                        {
                            question.answers.map(answer => {
                                return (
                                    <Col s={12/question.answers.length}>
                                        <Input
                                        required
                                        onChange={evt => this.updateInputValue(evt, `question${question.questionID}Answer`)}
                                        value={this.state[`question${question.questionID}Answer`]}
                                        className="signup-input"
                                        type={question.type}
                                        name={question.questionID}
                                        label={answer}
                                        s={12} />
                                    </Col>
                                )
                            })
                        }
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
