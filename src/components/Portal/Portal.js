import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Portal.css';
import { bindActionCreators } from 'redux'
import { authenticate } from '../../actions/authenticate'
import { setPermissions } from '../../actions/setPermissions'
import { getUserInfo } from '../../actions/getUserInfo'
import { getAllTools } from '../../actions/getAllTools'
import { Icon,
         Section,
         Row, 
         Col, 
         Button,
         Collection,
         CollectionItem,
         Modal } from 'react-materialize'
import { Redirect } from 'react-router-dom'
import SubHeader from '../SubHeader/SubHeader'


class Portal extends Component {
  componentWillMount(){
    this.props.authenticate().then(r => r).catch(err => err)
    this.props.getAllTools()
    this.props.getUserInfo().then(r => this.props.setPermissions(r.payload.role)).catch(err => err)
  }

  render() {
    if(!this.props.username){
      return <Redirect to="/" />
    } else {
      return (
        <div>
          {/* HEADER */}
          <SubHeader icon={require("../../assets/launch_icon.png")} subHeader="Portal"/>
          
          {
            this.props.allTools ?
            this.props.allTools.map((tool, i) => {
              return (
                <Section key={i} className="portal-body-wrapper valign-wrapper">
                  <Row className={`${tool.url[0] != 'h' ? "image" : null} tool-wrapper`}>
                    <Col s={2} className='valign-wrapper'>
                      <h6 className="tool-name">{tool.name}</h6>
                    </Col>
                    <Col className="tool-description" s={6}>
                        {tool.description}
                    </Col>
                    <Col s={4} className="center">
                        <Row>
                        <Modal
                          header="You'll need some credentials"
                          trigger={<Button disabled={tool.url[0] != 'h' ? true : false}  className="portal-buttons" waves='light' > Open <Icon right tiny className="data">touch_app</Icon></Button>}>
                          <Row className="margin-top valign-wrapper">
                            <Col s={6}>
                              <div className="border-bottom">Username: <span className="bold">{tool.username}</span></div>
                              <div className="border-bottom">Password: <span className="bold">{tool.password}</span> </div>
                            </Col>
                            <Col s={6}>
                              <Button disabled={tool.url[0] != 'h' ? true : false} className="portal-buttons modal-close" waves='light' node='a' target="_blank" href={tool.url}> Open <Icon right tiny className="data">touch_app</Icon></Button>
                            </Col>
                          </Row>
                        </Modal>
                        </Row>
                        <Row>
                          <Modal
                            className="full-page"
                            header={`${tool.name} Data Sources`}
                            bottomSheet
                            trigger={<Button disabled={tool.url[0] != 'h' ? true : false} className="portal-buttons" waves='light'>Data <Icon right tiny className="data">cloud</Icon> </Button>}>
                            <Collection>
                            {this.props[`${tool.name == "MEADE/SORT-OE" ? "MEADE" :
                                          tool.name == "Argument Mapper" ? "AM" : tool.name}DataSets`].map(dataSet => {
                              return <CollectionItem>{dataSet}</CollectionItem>
                            })}
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
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
      allTools: state.tools.allTools,
      role: state.auth.role,
      MEADEDataSets: state.tools.MEADEDataSets,
      AtNDataSets: state.tools.AtNDataSets,
      AMDataSets: state.tools.AMDataSets
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({authenticate, getAllTools, getUserInfo, setPermissions}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Portal)