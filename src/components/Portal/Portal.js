import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Portal.css';
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
import { getAllTools } from '../../actions/getAllTools'
import { Icon, Section, Row, Col, Button } from 'react-materialize'


class Portal extends Component {
  componentWillMount(){
    // setTimeout(() => {this.props.checkCookie()},500)
    this.props.getAllTools()
  }

  render() {
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
                <Icon className="orange-icon" right={true} medium>touch_app</Icon>
              </Col>
              <Col s={1}>
                <h5 className="dash-username">Launch Portal</h5>
              </Col>
              <Col s={10}></Col>
            </Row>
            <Row>
              <Col s={12}>
                <hr className="thick-line-blue" />
              </Col>
            </Row>
          </Section>
          
          {
            this.props.allTools ?
            this.props.allTools.map((tool, i) => {
              return (
                <Section key={i} className="portal-body-wrapper valign-wrapper">
                  <Row className="tool-wrapper">
                    <Col s={2} className='valign-wrapper'>
                      <h6 className="tool-name">{tool.name}</h6>
                    </Col>
                    <Col s={6}>
                        {tool.description}
                    </Col>
                    {/* <Col s={2}></Col> */}
                    <Col s={4} className="center">
                        <Row>
                          <Button className="portal-buttons" waves='light' node='a' target="_blank" href='http://www.google.com'> Open <Icon right tiny className="data">touch_app</Icon></Button>
                        </Row>
                        <Row>
                          <Button className="portal-buttons" waves='light' node='a' target="_blank" href='http://www.google.com'>Data <Icon right tiny className="data">cloud</Icon> </Button>
                        </Row>
                    </Col>
                  </Row>
                </Section>
              )
            })
            : <div>Tools didn't make it...</div>
          }

        </div>
      )
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
      allTools: state.tools.allTools
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({checkCookie, getAllTools}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Portal)
