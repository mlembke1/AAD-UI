import React, { Component } from 'react';
import './SortoeQform.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
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

    updateInputValue = (evt, inputType) => {
        this.setState({[inputType]: evt.target.value})
      }
    
    render() {
    if(!this.props.username) {
      return <Redirect to="/" />
    } else {
      return (
        <Row>
            { this.props.sortoeQuestions.map(question => {
                return (
                    <Input 
                    required
                    onChange={evt => this.updateInputValue(evt, `question${question.questionID}Answer`)}
                    value={this.state[`question${question.questionID}Answer`]}
                    className="signup-input"
                    type={question.type}
                    label={question.question}
                    s={12} />
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

const mapDispatchToProps = dispatch => bindActionCreators({checkCookie, getUserInfo}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SortoeQform)
