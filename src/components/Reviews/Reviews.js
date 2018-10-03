import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Reviews.css';
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
import { getAllReviews } from '../../actions/getAllReviews'
import { editSaveToggle } from '../../actions/editSaveToggle'
import { updateReview } from '../../actions/updateReview'
import { postReview } from '../../actions/postReview'
import { deleteReview } from '../../actions/deleteReview'
import { getFile } from '../../actions/getFile'
import { clearFiles } from '../../actions/clearFiles'
import { Icon, Input, Section, Row, Col, Button, Collapsible, CollapsibleItem } from 'react-materialize'
// import { Document } from 'react-pdf'
import { Document } from 'react-pdf/dist/entry.noworker';



class Reviews extends Component {

    constructor(props) {
        super(props)
        this.state = {
            toolNameInputValue: 'SORTOE',
            textInputValue: '',
            editToolNameInputValue: 'SORTOE',
            editTextInputValue: '',
            fileInputValue: null,
            editFileInputValue: null,
            reviewsWithFiles: []
        }
    }
    
    componentWillMount = () => {
        this.props.checkCookie()
        this.props.getAllReviews()
        setTimeout(() => {
            if(this.props.allReviews.length < 1){
                this.props.clearFiles()
            } else {
                this.props.allReviews.map(review => {
                    if((this.props.files.filter(file => file.review_id == review.id).length < 1) && review.path != null){
                        this.props.getFile(review.path.substring(15), review.id)
                    }
                })
            }
        }, 500)
    }
    

    updateInputValue(evt, inputType) {
        if(inputType != "fileInputValue"){
            return this.setState({
              [inputType]: evt.target.value
            })
        } else {
            let fileArray = Array.from(evt.target.files)
            return this.setState({
                ...this.state,
                [inputType]: fileArray[0]
            })
        }
    }

  deleteHandler = (id) => {
    this.props.deleteReview(id)
  }
   

  toggleEditSaveHandler = (editable, toolName, reviewId, text) => {
    // Edit has already been open, now time to save the updates.
    if(editable) {
        this.props.editSaveToggle(editable, toolName, reviewId)
        this.props.updateReview(this.state.editToolNameInputValue, this.state.editTextInputValue, reviewId)
    } 
    // Edit has NOT already been open, now time to update the fields.
    else {
        this.props.editSaveToggle(editable, toolName, reviewId)
        this.setState({
            editToolNameInputValue: toolName,
            editTextInputValue: text
        })
    }
    setTimeout(() => {
        this.props.getAllReviews()
    }, 500)
  }

  postReviewHandler = () => {
    let reviewObject
      if(this.state.fileInputValue){
        reviewObject = {
            toolName: this.state.toolNameInputValue,
            textInput: this.state.textInputValue,
            blob: this.state.fileInputValue
        }      
      } else {
        reviewObject = {
              toolName: this.state.toolNameInputValue,
              textInput: this.state.textInputValue
        }  
      } 
    this.props.postReview(reviewObject)

    setTimeout(() => {
        this.props.getAllReviews()
        setTimeout(() => {
            this.props.allReviews.map(review => {
                if((this.props.files.filter(file => file.review_id == review.id).length < 1) && review.path != null){
                    this.props.getFile(review.path.substring(15), review.id)
                }
            })
        }, 500)
        this.setState({
            toolNameInputValue: 'SORTOE',
            textInputValue: "",
            fileInputValue: null
        })
    }, 500)
  }

  openAttachment = (bufferArr) => {
      const file = new Blob(
        bufferArr, 
        {type: 'application/pdf'});
    const fileURL = URL.createObjectURL(file).substring(27)
    window.open(`http://${fileURL}`)  
  }

  render() {
      return (
        <div>
          {/* ////////////////////  ///////   ///////////////////////// */}
          {/* ////////////////////  HEADER    ///////////////////////// */}
          {/* ////////////////////  ///////   ///////////////////////// */}
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

          {/* ////////////////////  ////////////////////////////////////////////   ///////////////////////// */}
          {/* ////////////////////  ARE THERE EXISTING REVIEWS? IF SO, SHOW HERE   ///////////////////////// */}
          {/* ////////////////////  ////////////////////////////////////////////   ///////////////////////// */}
            {
            this.props.allReviews && this.props.allReviews.length > 0 ?            
            this.props.allReviews.map((review) => {
              return (
                <Section key={review.id} className="reviews-wrapper center review-underline-wrapper">
                  <Row className={`c-item ${review.editable ? null : "valign-wrapper"}`}>
                    <Col s={2}>
                      {
                        review.editable ?
                        <Row>
                            <Input 
                            s={12} 
                            type='select' 
                            label="Choose A Tool" 
                            value={this.state.editToolNameInputValue}
                            onChange={evt => this.updateInputValue(evt, 'editToolNameInputValue')}
                            >
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
                        <Row>
                            {
                            review.editable ?
                                <Input 
                                onChange={evt => this.updateInputValue(evt, 'editTextInputValue')}
                                disabled={false} type='textarea' value={this.state.editTextInputValue} />
                            :
                                <Input  disabled={true} type='textarea' value={review.text} />
                            }
                        </Row>
                            {
                                this.props.files.filter(file => file.review_id == review.id).length  > 0 ?
                                <div onClick={() => this.openAttachment(this.props.files.filter(file => file.review_id == review.id)[0].file.data)}>
                                    View attachment
                                </div>
                                :
                                null
                            }
                        {
                            review.editable ?
                                <Row>
                                    <Input 
                                    id="file-input"
                                    type="file"
                                    label="File"
                                    name="fileUpload"
                                    s={12} 
                                    placeholder="Upload A File"
                                    onChange={evt => this.updateInputValue(evt, 'editFileInputValue')} />
                                </Row>
                            :
                                null
                        }
                    </Col>
                    <Col s={4} className="center">
                        {
                            review.editable ?
                            <div>
                                <Row>
                                    <Button onClick={() => this.toggleEditSaveHandler(review.editable, review.tool_name, review.id)} className="portal-buttons" waves='light'> Save <Icon right tiny className="data">check</Icon></Button>
                                </Row>
                                <Row>
                                    <Button onClick={() => this.deleteHandler(review.id)} className="portal-buttons" id="delete-button" waves='light'> Delete <Icon right tiny className="data">delete_outline</Icon></Button>
                                </Row>
                            </div>
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
                null
            }


            {/* ////////////////////  ////////////////////  ///////////////////////// */}
            {/* ////////////////////  ADD A REVIEW SECTION  ///////////////////////// */}
            {/* ////////////////////  ////////////////////  ///////////////////////// */}
            <Section className="reviews-wrapper center">            
                <Collapsible popout defaultActiveKey={1}>
                <CollapsibleItem header='Write A Review' icon='add'>
                    <Section>
                        <Row>
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
                                <Row>
                                    <Input 
                                    className="text-area"
                                    type='textarea'
                                    value={this.state.textInputValue}
                                    onChange={evt => this.updateInputValue(evt, 'textInputValue')}
                                    placeholder="Your review here..." />
                                </Row>
                                <Row>
                                    <Input 
                                    id="file-input"
                                    type="file"
                                    label="File"
                                    name="fileUpload"
                                    s={12} 
                                    placeholder="Upload A File"
                                    onChange={evt => this.updateInputValue(evt, 'fileInputValue')} />
                                    <div className="file-preview container">
                                        {
                                            this.state.fileInputValue ?
                                                this.state.fileInputValue.type.substring(0, 5) !== 'image' ?
                                                    <div className="non-image-file file" >
                                                        {this.state.fileInputValue.name}
                                                        {this.state.fileInputValue.type}
                                                    </div>
                                                :
                                                <img className="file"  src={window.URL.createObjectURL(this.state.fileInputValue)} />
                                            :
                                            null
                                        }
                                    </div>
                                </Row>
                            </Col>
                            <Col s={4} className="center">
                                <Button 
                                disabled={ (this.state.textInputValue.length > 3000 || this.state.textInputValue.length < 1) && this.state.fileInputValue == null }
                                onClick={() => this.postReviewHandler()} className="portal-buttons" waves='light'> Submit Review <Icon right tiny className="data">check</Icon></Button>
                            </Col>
                        </Row>
                    </Section>
                </CollapsibleItem>
                </Collapsible>      
            </Section>  
        </div>
      )
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
      allReviews: state.reviews.allReviews,
      files: state.reviews.files
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    checkCookie,
    getAllReviews,
    postReview, 
    editSaveToggle,
    updateReview,
    deleteReview,
    getFile, 
    clearFiles}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
