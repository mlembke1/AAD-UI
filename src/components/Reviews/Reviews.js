import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Reviews.css';
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
import { getAllReviews } from '../../actions/getAllReviews'
import { editSaveToggle } from '../../actions/editSaveToggle'
import { postReview } from '../../actions/postReview'
import { Icon, Input, Section, Row, Col, Button, Collapsible, CollapsibleItem } from 'react-materialize'


class Reviews extends Component {

    constructor(props) {
        super(props)
        this.state = {
            toolNameInputValue: 'SORTOE',
            textInputValue: ''
        }
    }

    updateInputValue(evt, inputType) {
        return this.setState({
          [inputType]: evt.target.value
        })
      }
  

  componentWillMount(){
    this.props.checkCookie() 
    this.props.getAllReviews()
  }
   

  toggleEditSaveHandler = (editable, toolName, reviewId) => {
      this.props.editSaveToggle(editable, toolName, reviewId)
      setTimeout(() => {this.props.getAllReviews()}, 500)
  }

  postReviewHandler = () => {
    const reviewObject = {
        toolName: this.state.toolNameInputValue,
        text: this.state.textInputValue
    }  
    this.props.postReview(reviewObject)
    setTimeout(() => {this.props.getAllReviews()}, 500)
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
                <Icon className="orange-icon" right={true} medium>assignment</Icon>
              </Col>
              <Col s={1}>
                <h5 className="dash-username">Reviews</h5>
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
            this.props.allReviews && this.props.allReviews.length > 0 ?            
            this.props.allReviews.map((review) => {
              return (
                <Section key={review.id} className="reviews-wrapper center valign-wrapper">
                  <Row className="c-item valign-wrapper">
                    <Col s={2} className='valign-wrapper'>
                      {
                        review.editable ?
                        <Row>
                            <Input s={12} type='select' label="Choose A Tool" value={review.tool_name}>
                                <option value='SORTOE'>SORTOE</option>
                                <option value='ATN'>AtN</option>
                                <option value='OTHER'>Other</option>
                            </Input>
                        </Row>
                        :
                        <h6 className="tool-name">{review.tool_name}</h6>
                      }
                    </Col>
                    <Col s={6}>
                        <Input disabled={!review.editable} type='textarea' value={review.text} />
                    </Col>
                    <Col s={4} className="center">
                        {
                            review.editable ?
                            <Row>
                                <Button onClick={() => this.toggleEditSaveHandler(review.editable, review.tool_name, review.id)} className="portal-buttons" waves='light'> Save <Icon right tiny className="data">check</Icon></Button>
                            </Row>
                            :
                            <Row>
                                <Button onClick={() => this.toggleEditSaveHandler(review.editable, review.tool_name, review.id)} className="portal-buttons" waves='light'> Edit <Icon right tiny className="data">create</Icon> </Button>
                            </Row>
                        }
                    </Col>
                  </Row>
                </Section>
              )
            })
            : 
            <Section className="reviews-wrapper center">
                <Collapsible popout defaultActiveKey={1}>
                    <CollapsibleItem className="c-item" header='Write A Review' icon='add'>
                        <Section>
                            <Row className="valign-wrapper">
                                <Col s={2} className='valign-wrapper'>
                                    <Input
                                    onChange={evt => this.updateInputValue(evt, 'toolNameInputValue')} 
                                    value={this.state.toolNameInputValue}
                                    type='select' label="Choose A Tool" >
                                        <option value='SORTOE'>SORTOE</option>
                                        <option value='ATN'>AtN</option>
                                        <option value='OTHER'>Other</option>
                                    </Input>
                                </Col>
                                <Col s={6}>
                                    <Input 
                                        id="text-area"
                                        type='textarea'
                                        data-length="3000"
                                        value={this.state.textInputValue}
                                        onChange={evt => this.updateInputValue(evt, 'textInputValue')}
                                        placeholder="Your review here..." />
                                </Col>
                                <Col s={4} className="center">
                                    <Button 
                                    disabled={ this.state.textInputValue.length > 3000 || this.state.textInputValue.length < 1 }
                                    onClick={() => this.postReviewHandler()} className="portal-buttons" waves='light'> Submit Review <Icon right tiny className="data">check</Icon></Button>
                                </Col>
                            </Row>
                        </Section>
                    </CollapsibleItem>
                </Collapsible>
            </Section>
            }


            {
              this.props.allReviews && this.props.allReviews.length > 0 ?
                <Section className="reviews-wrapper center">            
                    <Collapsible popout defaultActiveKey={1}>
                    <CollapsibleItem className="c-item" header='Write A Review' icon='add'>
                        <Section>
                            <Row className="valign-wrapper">
                                <Col s={2} className='valign-wrapper'>
                                    <Input
                                    onChange={evt => this.updateInputValue(evt, 'toolNameInputValue')} 
                                    value={this.state.toolNameInputValue}
                                    type='select' label="Choose A Tool" >
                                        <option value='SORTOE'>SORTOE</option>
                                        <option value='ATN'>AtN</option>
                                        <option value='OTHER'>Other</option>
                                    </Input>
                                </Col>
                                <Col s={6}>
                                    <Input 
                                        id="text-area"
                                        type='textarea'
                                        data-length="3000"
                                        value={this.state.textInputValue}
                                        onChange={evt => this.updateInputValue(evt, 'textInputValue')}
                                        placeholder="Your review here..." />
                                </Col>
                                <Col s={4} className="center">
                                    <Button 
                                    disabled={ this.state.textInputValue.length > 3000 || this.state.textInputValue.length < 1 }
                                    onClick={() => this.postReviewHandler()} className="portal-buttons" waves='light'> Submit Review <Icon right tiny className="data">check</Icon></Button>
                                </Col>
                            </Row>
                        </Section>
                    </CollapsibleItem>
                    </Collapsible>      
                </Section>  
                :
                null
            }

        </div>
      )
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
      allReviews: state.reviews.allReviews
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({checkCookie, getAllReviews, postReview, editSaveToggle}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
