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
import { removeFile } from '../../actions/removeFile'
import { Icon, Input, Section, Row, Col, Button, Collapsible, CollapsibleItem, Modal } from 'react-materialize'




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
            fileTypePasses: true,
            editFileTypePasses: true
        }
    }
    
    componentWillMount = () => {
        this.props.checkCookie()
        this.props.getAllReviews()
        setTimeout(() => {
            if(this.props.allReviews.length < 1 || !this.props.allReviews){
                this.props.clearFiles()
            } else {
                this.props.allReviews.map(review => {
                    if(this.props.files && (this.props.files.filter(file => file.review_id == review.id).length < 1) && review.path != null){
                        this.props.getFile(review.path.substring(15), review.id)
                    }
                })
            }
        }, 100)
    }

    updateInputValue(evt, inputType) {
        // IF THE INPUT DOES NOT CONAINT FILES THE FOLLOWING WILL EXECUTE
        if(inputType != "fileInputValue" && inputType != "editFileInputValue"){
            return this.setState({
              [inputType]: evt.target.value
            })
        } 
        // IF THE INPUT DOES CONTAIN FILES THE FOLLOWING WILL EXECUTE
        else {
            if(Array.from(evt.target.files).length > 0){
                const f = evt.target.files[0].type
                const lastSlashIndex = (f).lastIndexOf('/') + 1
                const type = f.substring(lastSlashIndex).trim()
                // IF THE FILE INPUT CONTAINS A FILE THAT ISN'T A PICTURE OR A PDF...
                if(type != 'jpg' &&
                   type != 'jpeg' &&
                   type != 'png' && 
                   type != 'pdf'){
                    // NEW FILE OR EDITING A FILE?
                    if(inputType == "fileInputValue"){
                        this.setState({
                            ...this.state,
                            fileTypePasses: false
                        })
                    } else {
                        this.setState({
                            ...this.state,
                            editFileTypePasses: false
                        })
                    }
                } 
                // THE INPUT HAS THE TYPE OF FILE AND ALSO HAS THE CORRECT TYPE OF FILE
                else {
                    // NEW FILE OR EDITING A FILE?
                    if(inputType == "fileInputValue"){
                        this.setState({
                            ...this.state,
                            fileTypePasses: true,
                            [inputType]: evt.target.files[0]
                        })
                    } else {
                        this.setState({
                            ...this.state,
                            editFileTypePasses: true,
                            [inputType]: evt.target.files[0]
                        })
                    }
                }
            }
        }
    }

  deleteHandler = (id) => {
    this.props.deleteReview(id)
    setTimeout(() => this.props.getAllReviews(), 200)
    setTimeout(() => {
    if(this.props.allReviews.length < 1){
        this.props.clearFiles()
    }
    }, 400)
  }
   

  toggleEditSaveHandler = (editable, toolName, reviewId, text, path) => {
    // Edit has already been open, now time to save the updates.
    let updateObject = {}
    if(editable) {
        this.props.editSaveToggle(editable, toolName, reviewId)
        if(this.state.editFileInputValue){
            updateObject = {
                toolName: this.state.editToolNameInputValue,
                text: this.state.editTextInputValue,
                reviewId,
                blob: this.state.editFileInputValue
            }
        } else {
            updateObject = {
                toolName: this.state.editToolNameInputValue,
                text: this.state.editTextInputValue,
                reviewId
            }
        }
        this.props.updateReview(updateObject)
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
    }, 200)
    setTimeout(() => {
        this.props.allReviews.map(review => {
            if(review.path && updateObject.hasOwnProperty('blob')){
                this.props.getFile(review.path.substring(15), review.id)
            }
        })
    }, 400)
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
                if(this.props.files && (this.props.files.filter(file => file.review_id == review.id).length < 1) && review.path != null){
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


  openAttachment = (base64, canvasId, isPDF) => {
    if(isPDF){
        const pdfData = atob(base64);
          
          // Loaded via <script> tag, create shortcut to access PDF.js exports.
          const pdfjsLib = window['pdfjs-dist/build/pdf'];
          
          // The workerSrc property shall be specified.
        //   pdfjsLib.GlobalWorkerOptions.workerSrc
          
          // Using DocumentInitParameters object to load binary data.
          const loadingTask = pdfjsLib.getDocument({data: pdfData});
          loadingTask.promise.then(function(pdf) {
            console.log('PDF loaded');
            
            // Fetch the first page
            const pageNumber = 1;
            pdf.getPage(pageNumber).then(function(page) {
              console.log('Page loaded');
              
              const scale = 1.5;
              const viewport = page.getViewport(scale);
          
              // Prepare canvas using PDF page dimensions
              const canvas = document.getElementById(`${canvasId}`)
              const context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;
          
              // Render PDF page into canvas context
              const renderContext = {
                canvasContext: context,
                viewport: viewport
              };
              const renderTask = page.render(renderContext);
              renderTask.then(function () {
                console.log('Page rendered');
              });
            });
          }, function (reason) {
            // PDF loading error
            console.error(reason);
          });
    }
      
  }

  removeFileHandler = reviewId => {
    this.props.removeFile(reviewId)
    setTimeout(() => this.props.getAllReviews(), 100)
    setTimeout(() => {
        if(this.props.allReviews.length > 0){
            this.props.allReviews.map(review => {
                if(review.path){
                    this.props.getFile(review.path.substring(15), review.id)
                }    
            })
        }
    }, 200)

    this.setState({
        ...this.state,
        editFileInputValue: null
    })
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
                                <Input  disabled={true} type='textarea' defaultValue={review.text} />
                            }
                        </Row>
                        {
                            review.editable ?
                                <Row>
                                    <Input 
                                    id="file-input"
                                    type="file"
                                    label={`${review.path ? `Replace` : "Upload"} `}  
                                    name="fileUpload"
                                    s={12} 
                                    placeholder={`${review.path ? "Replacement File Here" : "Upload File Here"}`}
                                    onChange={evt => this.updateInputValue(evt, 'editFileInputValue')} />
                                    <div className="file-preview container">
                                        {
                                            this.state.editFileInputValue && this.state.editFileTypePasses ?
                                                this.state.editFileInputValue.type.substring(0, 5) !== 'image' ?
                                                    <div className="non-image-file file" >
                                                        {this.state.editFileInputValue.name}
                                                        {this.state.editFileInputValue.type}
                                                        <Icon small className="data icon-green">check_circle_outline</Icon>
                                                    </div>
                                                :
                                                <div>
                                                    <img className="file"  src={window.URL.createObjectURL(this.state.editFileInputValue)} />
                                                </div>
                                            :
                                            null
                                        }
                                    </div>
                                </Row>
                            :
                                null
                        }
                        {
                            !this.state.editFileTypePasses && review.editable ?
                            <div className="error-text">File must be a picture(.jpg/.png/.jpeg) or a PDF.</div>
                            :
                            null
                        }
                    </Col>
                    <Col s={4} className="center">
                        {
                            review.editable ?
                            <div>
                                <Row>
                                    <Button disabled={!this.state.editFileTypePasses} onClick={() => this.toggleEditSaveHandler(review.editable, review.tool_name, review.id, review.text, review.path)} className="portal-buttons" waves='light'> Save <Icon right tiny className="data">check</Icon></Button>
                                </Row>
                                <Row>
                                    {
                                        this.props.files && this.props.files.filter(file => file.review_id == review.id).length  > 0 && review.editable && review.path ?
                                            <Modal
                                            trigger={<Button className="view-attachment-button"><span className="open-attachment-span" onClick={() => this.openAttachment(this.props.files.filter(file => file.review_id == review.id)[0].file, `${review.id}-canvas`, review.path.substr(review.path.length - 3) == 'pdf')}>View<Icon right tiny className="data">folder_open</Icon></span></Button>}>
                                            {   
                                                review.path.substr(review.path.length - 3) == 'pdf' ?
                                                <canvas className="canvas" width="100%" id={`${review.id}-canvas`}></canvas> :
                                                review.path.substr(review.path.length - 3) == 'jpg' || review.path.substr(review.path.length - 3) == 'png' || review.path.substr(review.path.length - 3) == 'jpeg' ?
                                                <img className="canvas" src={`data:image/${review.path.substr(review.path.length - 3)};base64,${this.props.files.filter(file => file.review_id == review.id)[0].file}`} /> :
                                                null
                                            }
                                            </Modal>
                                    :
                                        null
                                    }
                                </Row>
                                {
                                    review.editable && review.path ?
                                    <Row>
                                        <Button onClick={() => this.removeFileHandler(review.id)} className="portal-buttons delete-button" waves='light'> Remove File <Icon right tiny className="data">delete_outline</Icon></Button>
                                    </Row>
                                    :
                                    null
                                }
                                <Row>
                                    <Button onClick={() => this.deleteHandler(review.id)} className="portal-buttons delete-button" waves='light'> Delete Review <Icon right tiny className="data">delete_outline</Icon></Button>
                                </Row>
                            </div>
                            :
                            <div>
                                <Row>
                                    <Button onClick={() => this.toggleEditSaveHandler(review.editable, review.tool_name, review.id, review.text,  review.path)} className="portal-buttons" waves='light'> Edit <Icon right tiny className="data">create</Icon> </Button>
                                </Row>
                                <Row>
                                    {
                                        this.props.files && this.props.files.filter(file => file.review_id == review.id).length  > 0  && !review.editable && review.path ?
                                            <Modal
                                            trigger={<Button className="view-attachment-button"><span className="open-attachment-span" onClick={() => this.openAttachment(this.props.files.filter(file => file.review_id == review.id)[0].file, `${review.id}-canvas`, review.path.substr(review.path.length - 3) == 'pdf')}>View<Icon right tiny className="data">folder_open</Icon></span></Button>}>
                                            {
                                                review.path.substr(review.path.length - 3) == 'pdf' ?
                                                <canvas className="canvas" width="100%" id={`${review.id}-canvas`}></canvas> :
                                                review.path.substr(review.path.length - 3) == 'jpg' || review.path.substr(review.path.length - 3) == 'png' ?
                                                <img className="canvas" src={`data:image/${review.path.substr(review.path.length - 3)};base64,${this.props.files.filter(file => file.review_id == review.id)[0].file}`} /> :
                                                null
                                            }
                                            </Modal>
                                    :
                                        null
                                    }
                                </Row>
                            </div>
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
                                            this.state.fileInputValue && this.state.fileTypePasses ?
                                                this.state.fileInputValue.type.substring(0, 5) !== 'image' ?
                                                    <div className="non-image-file file" >
                                                        {this.state.fileInputValue.name}
                                                        {this.state.fileInputValue.type}
                                                        <Icon small className="data icon-green">check_circle_outline</Icon>
                                                    </div>
                                                :
                                                <div>
                                                    <img className="file"  src={window.URL.createObjectURL(this.state.fileInputValue)} />
                                                </div>
                                            :
                                            null
                                        }
                                    </div>
                                </Row>
                                {
                                    !this.state.fileTypePasses ?
                                    <div className="error-text">File must be a picture(.jpg/.png) or a PDF.</div>
                                    :
                                    null
                                }
                            </Col>
                            <Col s={4} className="center">
                                <Button 
                                disabled={ ((this.state.textInputValue.length > 3000 || this.state.textInputValue.length < 1) && this.state.fileInputValue == null)  || !this.state.fileTypePasses}
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
    clearFiles, 
    removeFile}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
