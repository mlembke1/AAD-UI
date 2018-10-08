import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Portal.css';
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
import { getAllTools } from '../../actions/getAllTools'
import { Icon,
         Section,
         Row, 
         Col, 
         Button,
         Collection,
         CollectionItem,
         Modal } from 'react-materialize'


class Portal extends Component {
  componentWillMount(){
    this.props.checkCookie()
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
                  <Row className={`${tool.url[0] != 'h' ? "image" : null} tool-wrapper`}>
                    <Col s={2} className='valign-wrapper'>
                      <h6 className="tool-name">{tool.name}</h6>
                    </Col>
                    <Col s={6}>
                        {tool.description}
                    </Col>
                    <Col s={4} className="center">
                        <Row>
                          <Button disabled={tool.url[0] != 'h' ? true : false} className="portal-buttons" waves='light' node='a' target="_blank" href={tool.url}> Open <Icon right tiny className="data">touch_app</Icon></Button>
                        </Row>
                        <Row>
                          <Modal
                            header={`${tool.name} Data Sources`}
                            bottomSheet
                            trigger={<Button disabled={tool.url[0] != 'h' ? true : false} className="portal-buttons" waves='light'>Data <Icon right tiny className="data">cloud</Icon> </Button>}>
                            <Collection>
                                <CollectionItem>The World Bank</CollectionItem>
                                <CollectionItem>USAID</CollectionItem>
                                <CollectionItem>2018 Index Of Economic Freedom</CollectionItem>
                                <CollectionItem>GTD(Global Terrorism Database)</CollectionItem>
                                <CollectionItem>Global Peace Index 2017</CollectionItem>
                                <CollectionItem>The GDELT Project</CollectionItem>
                                <CollectionItem>Fragile States Index</CollectionItem>
                                <CollectionItem>Google and Google News</CollectionItem>
                                <CollectionItem>Yahoo! Fellowship at Georgetown University</CollectionItem>
                                <CollectionItem>BBC Monitoring</CollectionItem>
                                <CollectionItem>National Academies Keck Futures Program</CollectionItem>
                                <CollectionItem>Reed Elsevier's LexisNexis Group</CollectionItem>
                                <CollectionItem>JSTOR</CollectionItem>
                                <CollectionItem>DTIC</CollectionItem>
                                <CollectionItem>Internet Archive</CollectionItem>
                              </Collection>
                          </Modal>
                        </Row>
                    </Col>
                    {
                      tool.url[0] != 'h' ?
                      <div className="middle">
                        <div className="text">COMING SOON</div>
                      </div>
                      :
                      null
                    }
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
