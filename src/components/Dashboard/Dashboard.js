import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
import { getUserInfo } from '../../actions/getUserInfo'
import { Icon, Section, Row, Col } from 'react-materialize'
import { Link, Redirect } from 'react-router-dom'


class Dashboard extends Component {
  componentWillMount(){
    this.props.checkCookie()
    this.props.getUserInfo()
  }

  render() {
    if(!this.props.username) {
      return <Redirect to="/" />
    } else {
      return (
        <div>
          {/* HEADER */}
          <Section className="dash-heading-wrapper">
            <Row> 
              <Col s={12}>
              </Col>
            </Row>
            <Row className='center valign-wrapper'>
              <Col s={1}>
              <img src={require("../../assets/person_icon.png")}  width="50px" />
              </Col>
              <Col s={1}>
                <h5 className="dash-username">{this.props.username}</h5>
              </Col>
              <Col s={10}></Col>
            </Row>
            <Row>
              <Col s={12}>
                <hr className="thin" />
              </Col>
            </Row>
          </Section>

          <Section id="dash-body-wrapper valign-wrapper">
            <Row s={12} className='center valign-wrapper dash-row-wrapper'>
              <Col className='valign-wrapper center border-right-bottom tool-wrapper' s={12} m={4}>
                  <Link  to="/reviews">
                    <div className="dashboard-block-wrapper">
                      <img src={require("../../assets/assessment_icon.png")} width="100px" />
                      <div className="j-title">Your Assessments</div>
                      <hr className="thin width40Per"/>
                      <p className="dashboard-description-text">
                      Come here to post reviews on all the tools you have used.
                      </p>
                      <hr className="thin width40Per"/>
                    </div>
                  </Link>
              </Col>
              <Col className='valign-wrapper center border-right-bottom tool-wrapper' s={12} m={4}>
                  <Link  to="/portal">
                    <div className="dashboard-block-wrapper">
                      <img src={require("../../assets/launch_icon.png")} width="100px" />
                      <div className="j-title">Portal</div>
                      <hr className="thin width40Per"/>
                      <p className="dashboard-description-text">
                      All tools available will be found here.
                      </p>
                      <hr className="thin width40Per"/>
                    </div>
                  </Link>
              </Col>
              <Col className='valign-wrapper center border-left-bottom tool-wrapper' s={12} m={4}>
                  <Link  to="/public">
                    <div className="dashboard-block-wrapper">
                      <img src={require("../../assets/lightbulb_icon.png")} width="100px" />
                      <div className="j-title">Public Reviews</div>
                      <hr className="thin width40Per"/>
                      <p className="dashboard-description-text">
                      Checkout public reviews and see what other people are saying.
                      </p>
                      <hr className="thin width40Per"/>
                    </div>
                  </Link>
              </Col>
            </Row>
            <Row><Col s={12}></Col></Row>
          </Section>

        </div>
      )
    }
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({checkCookie, getUserInfo}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
