import React, { Component } from 'react';
import { connect } from 'react-redux'
import './PublicReviews.css';
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
import { getUserInfo } from '../../actions/getUserInfo'
import { getAllTools } from '../../actions/getAllTools'
import { getAllPublicReviews } from '../../actions/getAllPublicReviews'
import { editSaveToggle } from '../../actions/editSaveToggle'
import { updateReview } from '../../actions/updateReview'
import { postReview } from '../../actions/postReview'
import { deleteReview } from '../../actions/deleteReview'
import { getFile } from '../../actions/getFile'
import { clearFiles } from '../../actions/clearFiles'
import { removeFile } from '../../actions/removeFile'
import { setPostCompleteFalse } from '../../actions/setPostCompleteFalse'
import { setUpdateCompleteFalse } from '../../actions/setUpdateCompleteFalse'
import { setDeleteCompleteFalse } from '../../actions/setDeleteCompleteFalse'
import { setRemoveFileCompleteFalse } from '../../actions/setRemoveFileCompleteFalse'
import { Icon, Input, Section, Row, Col, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize'
import { Redirect } from 'react-router-dom'
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import wNumb from 'wnumb'








class PublicReviews extends Component {

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
            editFileTypePasses: true,
            postStarted: false,
            editRangeValue: 50,
            editPublicIsChecked: true,
            toolFilter: ['SORTOE', 'ATN', 'SOF4D'],
            ratingFilter: [0, 100]
        }
    }

    
    componentWillMount = () => {
        this.props.checkCookie()
        this.props.getUserInfo()
        this.props.getAllTools()
        this.props.getAllPublicReviews()
        setTimeout( () => {
            if(this.props.publicReviewsRequestFinished) {
                if(!this.props.allPublicReviews || this.props.allPublicReviews.length < 1){
                        this.props.clearFiles()
                } else {
                        this.props.allPublicReviews.map((review, i) => {
                            if(this.props.files && (this.props.files.filter(file => file.review_id == review.id).length < 1) && review.path != null){
                                    this.props.getFile(review.path.substring(15), review.id)
                                }
                        })
                }
            }
        }, 1000)

    }

    componentDidUpdate(){
        if(this.props.postComplete || this.props.deleteComplete || this.props.updateComplete || this.props.removeFileComplete) {
            this.props.postComplete ? this.setState({...this.state, postStarted: false }) : null
            this.props.clearFiles()
            this.props.getAllPublicReviews()
            setTimeout(() => {
                if(this.props.publicReviewsRequestFinished){
                    this.props.allPublicReviews.map((review, i) => {
                        if(this.props.files && (this.props.files.filter(file => file.review_id == review.id).length < 1) && review.path != null){
                                this.props.getFile(review.path.substring(15), review.id)
                            }
                    })
                }
            }, 1000)
            
            if (this.props.files.length == this.props.allPublicReviews.filter(review => review.path).length) {
                this.props.setPostCompleteFalse()
                this.props.setUpdateCompleteFalse()
                this.props.setDeleteCompleteFalse()
                this.props.setRemoveFileCompleteFalse()
            }
        }
    }

    doesRatingPassFilter = rating => rating >= this.state.ratingFilter[0] && rating <= this.state.ratingFilter[1] ? true : false

    doesToolNamePassFilter = toolName => this.state.toolFilter.includes(toolName) ? true : false

    

    updateInputValue(evt, inputType, toolName) {
        if (inputType == 'toolFilter') {
            let found = this.state.toolFilter.includes(toolName)
            if (found) {
                return this.setState({ 
                toolFilter: this.state.toolFilter.filter(x => x !== toolName)
                })
            } else {
                return this.setState({ 
                toolFilter: [ ...this.state.toolFilter, toolName ]
                })
            }
        }

        if(inputType == 'ratingFilter') {
            return this.setState({
                [inputType]: [evt[0], evt[1]]
            })
        }
        
        if(inputType != "fileInputValue" && inputType != "editFileInputValue" && inputType !== 'editPublicIsChecked'){
            return this.setState({
              [inputType]: evt.target.value
            })
        } else if (inputType == 'editPublicIsChecked') {
            return this.setState({
                [inputType]: evt.target.checked
              })
        }
        
        // IF THE INPUT DOES CONTAIN FILES THE FOLLOWING WILL EXECUTE
        else {
            if(evt.target.files[0] == undefined){
                this.setState({
                    [inputType]: null
                })
            }

            if(Array.from(evt.target.files).length > 0){
                const f = evt.target.files[0].type
                const lastSlashIndex = (f).lastIndexOf('/') + 1
                const type = f.substring(lastSlashIndex).trim()
                // IF THE FILE INPUT CONTAINS A FILE THAT ISN'T A PICTURE OR A PDF or IF THE PICTURE OR PDF HAS UPPERCASE EXTENSION...
                if((type != 'jpg' &&
                   type != 'jpeg' &&
                   type != 'png' && 
                   type != 'pdf' &&
                   type != 'JPG' &&
                   type != 'JPEG' &&
                   type != 'PNG' && 
                   type != 'PDF' )
                   ||
                   (
                    evt.target.files[0].name.slice(-3) == 'JPG' ||
                    evt.target.files[0].name.slice(-3) == 'JPEG' ||
                    evt.target.files[0].name.slice(-3) == 'PNG' ||
                    evt.target.files[0].name.slice(-3) == 'PDF'
                   )
                   
                   ){
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
    setTimeout(() => this.props.getAllPublicReviews(), 200)
    setTimeout(() => {
    if(this.props.allPublicReviews.length < 1){
        this.props.clearFiles()
    }
    }, 400)
  }
   

  toggleEditSaveHandler = (editable, toolName, reviewId, text, path, sharable, rating) => {
    // Edit has already been open, now time to save the updates.
    let updateObject = {}
    if(editable) {
        this.props.editSaveToggle(editable, toolName, reviewId)
        if(this.state.editFileInputValue){
            updateObject = {
                toolName: this.state.editToolNameInputValue,
                text: this.state.editTextInputValue,
                reviewId,
                blob: this.state.editFileInputValue,
                sharable: this.state.editPublicIsChecked,
                rating: this.state.editRangeValue
            }
        } else {
            updateObject = {
                toolName: this.state.editToolNameInputValue,
                text: this.state.editTextInputValue,
                reviewId,
                rating: this.state.editRangeValue,
                sharable: this.state.editPublicIsChecked
            }
        }
        this.props.updateReview(updateObject)
        this.setState({
            ...this.state,
            editFileInputValue: null
        })
    } 
    // Edit has NOT already been open, now time to update the fields.
    else {
        this.props.editSaveToggle(editable, toolName, reviewId, rating)
        this.setState({
            ...this.state,
            editToolNameInputValue: toolName,
            editTextInputValue: text,
            editRangeValue: rating,
            editPublicIsChecked: sharable
        })
    }
    setTimeout(() => {
        this.props.getAllPublicReviews()
    }, 200)
    setTimeout(() => {
        this.props.allPublicReviews.map(review => {
            if(review.path && updateObject.hasOwnProperty('blob')){
                this.props.getFile(review.path.substring(15), review.id)
            }
        })
    }, 400)
  }


  openAttachment = (base64, canvasId, isPDF) => {
    if(isPDF){
        const pdfData = atob(base64);
        const pdfjsLib = window['pdfjs-dist/build/pdf'];
        pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
        const PDFJS = pdfjsLib;
        const canvasContainer = document.getElementById(`${canvasId}-container`)            
        canvasContainer.innerHTML = ""

        function renderPage(page) {
            var viewport = page.getViewport(1.4);
            const canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var renderContext = {
              canvasContext: ctx,
              viewport: viewport
            };
            
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            canvasContainer.appendChild(canvas);
            
            page.render(renderContext);
        }
        
        function renderPages(pdfDoc) {
            for(var num = 1; num <= pdfDoc.numPages; num++)
                pdfDoc.getPage(num).then(renderPage);
        }
        PDFJS.disableWorker = true;
        PDFJS.getDocument({data: pdfData}).then(renderPages);
          
        
    } 
  }

  removeFileHandler = reviewId => {
    this.props.removeFile(reviewId)
  }

  applyColor = rangeValue => {
    return rangeValue >= 0 && rangeValue <= 59 ? "F" :
    rangeValue >= 60 && rangeValue <= 69 ? "D" :
    rangeValue >= 70 && rangeValue <= 79 ? "C" :
    rangeValue >= 80 && rangeValue <= 89 ? "B" : "A"
}

  render() {
    const filterIcon = <img src={require("../../assets/filter_icon.png")} width="20px" className="filter-icon" />
    if(!this.props.username){
        return <Redirect to="/" />
      } else {
      return (
        <div>
          {/* ////////////////////  ///////   ///////////////////////// */}
          {/* ////////////////////  HEADER    ///////////////////////// */}
          {/* ////////////////////  ///////   ///////////////////////// */}
          <Section className="dash-heading-wrapper public-reviews-header">
            <Row> 
              <Col s={12}>
              </Col>
            </Row>
            <Row className='center valign-wrapper'>
              <Col s={1}>
                <img src={require("../../assets/assessment_icon.png")} width="70px" />
              </Col>
              <Col s={1}>
                <h5 className="dash-username j-title">PUBLIC REVIEWS</h5>
              </Col>
              <Col s={3}></Col>
              <Col s={7}>
              <Collapsible>
                <CollapsibleItem  header='Filters' icon={filterIcon}>
                    <Row className="center-align">
                        <Col s={1}><span className="bold">Tools:</span></Col>
                        <Col s={2}></Col>
                        <Col className="center-align" s={9} >
                            {
                                this.props.allTools.map((tool, i) => {
                                    return    <Input  
                                            onChange={e => this.updateInputValue(e, 'toolFilter', tool.name)} 
                                            key={i}
                                            name='toolFilter'
                                            type='checkbox'
                                            value={tool.name}
                                            checked={this.state.toolFilter.includes(tool.name)}
                                            label={tool.name} 
                                            />
                                            
                                })
                            }
                        </Col>
                    </Row>
                    <Row className="center-align">
                        <Col s={1}><span className="bold top-margin-20">Rating:</span></Col>
                         <Col s={11} >   
                            <Nouislider onChange={evt => this.updateInputValue(evt, 'ratingFilter')} tooltips step={1}  decimals={0} range={{ min: 0, max: 100 }} start={[0, 100]} connect format={ wNumb({ decimals: 0 }) }/>
                        </Col>
                    </Row>
                </CollapsibleItem>
                </Collapsible>
              </Col>
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
            this.props.allPublicReviews && this.props.allPublicReviews.length > 0 ?            
            this.props.allPublicReviews.filter(review => this.doesRatingPassFilter(review.rating) && this.doesToolNamePassFilter(review.tool_name)).map((review) => {
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
                            review.editable ?
                                <Row>
                                    <Input 
                                    id="file-input"
                                    type="file"
                                    label={`${review.path ? `Replace` : "Upload"} `}  
                                    name="fileUpload"
                                    s={12} 
                                    placeholder={`(.jpg/.png/.jpeg) or a .pdf.`}
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
                            <div>
                                <div className="error-text">File must be a picture(.jpg/.png/.jpeg) or a PDF.</div>
                                <div className="error-text">Please ensure file extensions are all lowercase.</div>
                            </div>
                            :
                            null
                        }
                    </Col>
                    <Col s={4} className="center">
                        {
                            review.editable ?
                            <div>
                                <Row className="border-bottom">
                                        <p>Overall {this.state.toolNameInputValue} rating: 
                                            <span className={`bold ${this.applyColor(this.state.editRangeValue) }`}>{this.state.editRangeValue}% </span></p>
                                        <p className="range-field maxWidth70 center">
                                            <input 
                                            type="range"
                                            value={this.state.editRangeValue}
                                            onChange={evt => this.updateInputValue(evt, 'editRangeValue')}
                                            min="0" max="100" />
                                        </p>
                                </Row>
                                <Row className="border-bottom">
                                        <div className="switch">
                                            <label>
                                            Private
                                            <input type="checkbox" checked={this.state.editPublicIsChecked} onChange={evt => this.updateInputValue(evt, 'editPublicIsChecked')}/>
                                            <span className="lever"></span>
                                            Public
                                            </label>
                                        </div>          
                                </Row>
                                <Row>
                                    <Button disabled={!this.state.editFileTypePasses} 
                                        onClick={() => this.toggleEditSaveHandler(review.editable, review.tool_name, review.id, review.text, review.path, review.sharable, review.rating)} 
                                        className="portal-buttons" waves='light'>
                                        Save
                                        <Icon right tiny className="data">check</Icon>
                                    </Button>
                                </Row>
                                <Row>
                                    {
                                        this.props.files && this.props.files.filter(file => file.review_id == review.id).length  > 0 && review.editable && review.path ?
                                            <Modal
                                            className="review-modal"
                                            trigger={
                                            <div className="portal-buttons view-buttons" >
                                                <span onClick={() => this.openAttachment(this.props.files.filter(file => file.review_id == review.id)[0].file, `${review.id}-canvas`, review.path.substr(review.path.length - 3) == 'pdf')} 
                                                className="open-attachment-span" >
                                                    View
                                                    <Icon right tiny className="data view-icon">folder_open</Icon>
                                                </span>
                                            </div>
                                            }>
                                            {   
                                                review.path.substr(review.path.length - 3) == 'pdf' ?
                                                <div id={`${review.id}-canvas-container`}></div> :
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
                                <Row className="border-bottom"></Row>
                                <Row className="valign-wrapper margin-top-bottom border-bottom">
                                <Col s={2}>
                                    <div className={`bold ${this.applyColor(review.rating) }`}>{review.rating}% </div>
                                </Col>
                                <Col s={10}>
                                    <div> {review.firstName} {review.lastName} </div>
                                    <div> {review.jobTitle} at {review.company} </div>
                                </Col>
                                </Row>
                                {
                                    review.username == this.props.username ?
                                    <Row>
                                        <Button onClick={() => this.toggleEditSaveHandler(review.editable, review.tool_name, review.id, review.text,  review.path, review.sharable, review.rating)} className="portal-buttons" waves='light'> Edit <Icon right tiny className="data">create</Icon> </Button>
                                    </Row>
                                    :
                                    null
                                }
                                
                                <Row>
                                    {
                                        // this.props.isFetching && review.path ? 
                                        (this.props.files.length != this.props.allPublicReviews.filter(review => review.path).length) && review.path ?
                                        <div>
                                            <div className="progress">
                                                <div className="indeterminate"></div>
                                            </div>
                                            <div>Loading File...</div>
                                        </div>
                                        :
                                        this.props.files && this.props.files.filter(file => file.review_id == review.id).length  > 0  && !review.editable && review.path ?
                                            <Modal
                                            className="review-modal"
                                            trigger={
                                            <div className="portal-buttons view-buttons" >
                                                <span onClick={() => this.openAttachment(this.props.files.filter(file => file.review_id == review.id)[0].file, `${review.id}-canvas`, review.path.substr(review.path.length - 3) == 'pdf')} 
                                                className="open-attachment-span" >
                                                    View
                                                    <Icon right tiny className="data view-icon">folder_open</Icon>
                                                </span>
                                            </div>
                                            }>
                                            {
                                                review.path.substr(review.path.length - 3) == 'pdf' ?
                                                <div id={`${review.id}-canvas-container`}></div> :
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
        </div>
      )
    }
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
      allPublicReviews: state.reviews.allPublicReviews,
      files: state.reviews.files,
      postComplete: state.reviews.postComplete,
      updateComplete: state.reviews.updateComplete,
      deleteComplete: state.reviews.deleteComplete,
      removeFileComplete: state.reviews.removeFileComplete,
      publicReviewsRequestFinished: state.reviews.publicReviewsRequestFinished,
      allTools: state.tools.allTools
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    checkCookie,
    getAllPublicReviews,
    postReview, 
    editSaveToggle,
    updateReview,
    deleteReview,
    getFile, 
    clearFiles, 
    setPostCompleteFalse,
    setUpdateCompleteFalse,
    setDeleteCompleteFalse,
    setRemoveFileCompleteFalse,
    getUserInfo,
    getAllTools,
    removeFile}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PublicReviews)
