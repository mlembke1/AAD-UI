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
        <div className="dash-outter-wrapper">
          <Section id="dash-body-wrapper valign-wrapper">
            <Row s={12} className='center valign-wrapper dash-row-wrapper'>
              <Col className='valign-wrapper center tool-wrapper hover-lighten border-bottom-and-right' s={12} m={6}>
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
              <Col className='valign-wrapper center  tool-wrapper hover-lighten border-bottom-and-left' s={12} m={6}>
                  <Link  to="/reviews">
                    <div className="dashboard-block-wrapper">
                      <img src={require("../../assets/assessment_icon.png")} width="100px" />
                      <div className="j-title">Your Assessments</div>
                      <hr className="thin width40Per"/>
                      <p className="dashboard-description-text">
                      Post public or private reviews on all the tools you have used.
                      </p>
                      <hr className="thin width40Per"/>
                    </div>
                  </Link>
              </Col>
            </Row>
            <Row>
              <Col className='valign-wrapper center  tool-wrapper hover-lighten border-top-and-right' s={12} m={6}>
                  <Link  to="/public">
                    <div className="dashboard-block-wrapper">
                      <img src={require("../../assets/lightbulb_icon.png")} width="100px" />
                      <div className="j-title">Public Reviews</div>
                      <hr className="thin width40Per"/>
                      <p className="dashboard-description-text">
                      See what other people are saying about the tools available.
                      </p>
                      <hr className="thin width40Per"/>
                    </div>
                  </Link>
              </Col>
              <Col className='valign-wrapper center tool-wrapper hover-lighten border-top-and-left' s={12} m={6}>
                  <Link  to="/stats">
                    <div className="dashboard-block-wrapper">
                      <img src={require("../../assets/stats_icon.png")} width="100px" />
                      <div className="j-title">The Stats</div>
                      <hr className="thin width40Per"/>
                      <p className="dashboard-description-text">
                      Statistically displaying how tools are measuring up.
                      </p>
                      <hr className="thin width40Per"/>
                    </div>
                  </Link>
              </Col>
            </Row>
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
