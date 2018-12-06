import React, { Component } from 'react';
import { connect } from 'react-redux'
import './PublicReviews.css';
import { bindActionCreators } from 'redux'
import { authenticate } from '../../actions/authenticate'
import { getUserInfo } from '../../actions/getUserInfo'
import { setPermissions } from '../../actions/setPermissions'
import { getAllTools } from '../../actions/getAllTools'
import { getAllPublicReviews } from '../../actions/getAllPublicReviews'
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
            toolNameInputValue: 'MEADE/SORT-OE',
            textInputValue: '',
            editToolNameInputValue: 'MEADE/SORT-OE',
            editTextInputValue: '',
            fileInputValue: null,
            editFileInputValue: null,
            fileTypePasses: true,
            editFileTypePasses: true,
            postStarted: false,
            editRangeValue: 50,
            editPublicIsChecked: true,
            toolFilter: ['MEADE/SORT-OE', 'Argument Mapper'],
            ratingFilter: [0, 100],
            editAnswer_1_value: "",
            editAnswer_2_value: "",
            editAnswer_3_value: "",
            editAnswer_4_value: "",
            editAnswer_5_value: "",
            reviewIdBeingEdited: null
        }
    }

    
    componentWillMount = () => {
        this.props.authenticate()
        this.props.getUserInfo().then(r => this.props.setPermissions(r.payload.role))
        this.props.getAllTools()
        this.props.getAllPublicReviews().then(r => {
            if(!this.props.allPublicReviews || this.props.allPublicReviews.length < 1) {this.props.clearFiles()}
            else {
                this.props.allPublicReviews.map((review, i) => {
                    if(this.props.files && (this.props.files.filter(file => file.review_id == review.id).length < 1) && review.path != null){
                           return this.props.getFile(review.path.substring(15), review.id)
                        }
                })
            }
        })

    }

    componentDidUpdate(){
        if(this.props.postComplete || this.props.deleteComplete || this.props.updateComplete || this.props.removeFileComplete) {
            this.props.postComplete ? this.setState({...this.state, postStarted: false }) : null
            this.props.clearFiles()
            this.props.getAllPublicReviews().then(r => {
                this.props.allPublicReviews.map((review, i) => {
                    if(this.props.files && (this.props.files.filter(file => file.review_id == review.id).length < 1) && review.path != null){
                            this.props.getFile(review.path.substring(15), review.id)
                        }
                })
            })
            
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
    this.props.getAllPublicReviews().then(r => {
        if(this.props.allPublicReviews.length < 1){
            this.props.clearFiles()
        }
    })
  }
   

  toggleEditSaveHandler = (editable, toolName, reviewId,
                          text, path, sharable, rating,
                          answer_1, answer_2, answer_3, 
                          answer_4, answer_5) => {
    let updateObject = {}
    if(editable) {
        updateObject = {
            toolName: this.state.editToolNameInputValue,
            textInput: this.state.editTextInputValue,
            reviewId,
            blob: this.state.editFileInputValue,
            sharable: this.state.editPublicIsChecked,
            rating: this.state.editRangeValue,
            answer_1: this.state.editAnswer_1_value,
            answer_2: this.state.editAnswer_2_value,
            answer_3: this.state.editAnswer_3_value,
            answer_4: this.state.editAnswer_4_value,
            answer_5: this.state.editAnswer_5_value
        }
        this.props.updateReview(updateObject)
        .then(res => {
            this.props.getAllPublicReviews().then(r => {
                this.props.allPublicReviews.map(review => {
                    if(review.path && updateObject.hasOwnProperty('blob')){
                        this.props.getFile(review.path.substring(15), review.id)
                    }
                })
            })
        })
        this.setState({
            ...this.state,
            editFileInputValue: null,
            reviewIdBeingEdited: null
        })
    } 
    // Edit has NOT already been open, now time to update the fields.
    else {
        this.setState({
            ...this.state,
            editToolNameInputValue: toolName,
            editTextInputValue: text,
            editPublicIsChecked: sharable,
            editRangeValue: rating,
            editAnswer_1_value: answer_1 || "",
            editAnswer_2_value: answer_2 || "",
            editAnswer_3_value: answer_3 || "",
            editAnswer_4_value: answer_4 || "",
            editAnswer_5_value: answer_5 || "",
            reviewIdBeingEdited: reviewId
        })
    }
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
    const filterIcon = <img alt="icon" src={require("../../assets/filter_icon.png")} width="20px" className="filter-icon" />
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
                <img alt="icon" src={require("../../assets/assessment_icon.png")} width="70px" />
              </Col>
              <Col s={1}>
                <h5 className="dash-username j-title">Public Reviews</h5>
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
                                    return  <Input  
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
                  <Row className={`c-item`}>
                    <Col s={2}>
                      {
                        (review.id === this.state.reviewIdBeingEdited) ?
                        <Row>
                            <Input 
                            s={12} 
                            type='select' 
                            label="Choose A Tool" 
                            value={this.state.editToolNameInputValue}
                            onChange={evt => this.updateInputValue(evt, 'editToolNameInputValue')}>
                                <option value='MEADE/SORT-OE'>MEADE/SORT-OE</option>
                                <option value='Argument Mapper'>Argument Mapper</option>
                            </Input>
                        </Row>
                        :
                        <h6 className="tool-name">{review.tool_name}</h6>
                      }
                    </Col>
                    <Col s={6}>
                        {
                            (review.id === this.state.reviewIdBeingEdited) ?
                            <Row>
                                {review.tool_name == 'MEADE/SORT-OE' ?
                                <Collapsible>
                                    <CollapsibleItem id="edit-results-collapsible" header="Edit Questionaire Results" icon="expand_more">
                                    {this.props.sortoeQuestions.map(question => (
                                        <Row className="border-bottom valign-wrapper min-width-100 edit-results-item">
                                            <Col s={8}>
                                                <span className="uppercase-light-font">{question.question}</span>
                                            </Col>
                                            <Col s={4}>
                                                {/* <span className="uppercase-bold-font">{review[`answer_${question.questionID}`]}</span> */}
                                                <Input 
                                                s={12} 
                                                type='select' 
                                                value={this.state[`editAnswer_${question.questionID}_value`]}
                                                onChange={evt => this.updateInputValue(evt, `editAnswer_${question.questionID}_value`)}>
                                                    <option value='Strongly Disagree'>Strongly Disagree</option>
                                                    <option value='Disagree'>Disagree</option>
                                                    <option value='Indifferent'>Indifferent</option>
                                                    <option value='Agree'>Agree</option>
                                                    <option value='Strongly Agree'>Strongly Agree</option>
                                                </Input>
                                            </Col> 
                                        </Row>
                                    ))}
                                    </CollapsibleItem>
                                </Collapsible>
                                : 
                                null}
                                <Input 
                                s={12} 
                                onChange={evt => this.updateInputValue(evt, 'editTextInputValue')}
                                disabled={false} 
                                type='textarea' 
                                value={this.state.editTextInputValue}
                                placeholder={review.text.length < 1 ? "Add A Comment Here..." : null}/>
                            </Row>
                            :
                            <Row>
                                {review.tool_name == 'MEADE/SORT-OE' ?
                                <Collapsible>
                                    <CollapsibleItem id="view-results-collapsible" header="View Questionaire Results" icon="expand_more">
                                    {this.props.sortoeQuestions.map(question => (
                                        <Row className="border-bottom valign-wrapper min-width-100 view-results-item">
                                            <Col s={8}>
                                                <span className="uppercase-light-font">{question.question}</span>
                                            </Col>
                                            <Col s={4}>
                                                <span className="uppercase-bold-font">{review[`answer_${question.questionID}`]}</span>
                                            </Col> 
                                        </Row>
                                    ))}
                                    </CollapsibleItem>
                                </Collapsible>
                                : 
                                null}
                            
                                {review.text.length > 0 ? 
                                <Input s={12}  disabled={true} type='textarea' value={review.text} />
                                :
                                null}
                            </Row>
                            }
                        {
                            (review.id === this.state.reviewIdBeingEdited) ?
                                <Row>
                                    {
                                    this.state.editFileInputValue && this.state.editFileTypePasses ?
                                        this.state.editFileInputValue.type.substring(0, 5) !== 'image' ?
                                        <Row className="valign-wrapper">
                                            <Col s={7} className="non-image-file file" >
                                                {this.state.editFileInputValue.name}
                                                {this.state.editFileInputValue.type}
                                                <Icon small className="data icon-green">check_circle_outline</Icon>
                                            </Col>
                                            <Col s={5}>
                                                <Button onClick={() => this.setState({ ...this.state, editFileInputValue: null })} className="portal-buttons delete-button" waves='light'> Cancel <Icon right tiny className="data">delete_outline</Icon></Button>
                                            </Col>
                                        </Row>
                                        :
                                        <Row className="valign-wrapper">
                                            <Col s={7}>
                                                <img alt="file" className="file"  src={window.URL.createObjectURL(this.state.editFileInputValue)} />
                                            </Col>
                                            <Col s={5}>
                                                <Button onClick={() => this.setState({ ...this.state, editFileInputValue: null })} className="portal-buttons delete-button" waves='light'> Cancel <Icon right tiny className="data">delete_outline</Icon></Button>
                                            </Col>
                                        </Row>  
                                    :
                                    <Row>
                                        <Input 
                                        className="already-posted"
                                        id="file-input"
                                        type="file"
                                        s={12}
                                        label={review.path ? <span>Replace<Icon right tiny  className="data">cloud_upload</Icon></span> : <span>Upload<Icon right tiny  className="data">cloud_upload</Icon></span>}  
                                        name="fileUpload"
                                        placeholder={`${review.path ? review.path : `(.jpg/.png/.jpeg) or a .pdf.`}`}
                                        onChange={evt => this.updateInputValue(evt, 'editFileInputValue')} />
                                    </Row>
                                    }
                                </Row>
                            :
                                null
                        }
                        {
                            !this.state.editFileTypePasses && ((review.id === this.state.reviewIdBeingEdited)) ?
                            <div>
                                <div className="error-text">File must be a picture(.jpg/.png/.jpeg) or a PDF.</div>
                                <div className="error-text">Please ensure file extensions are all lowercase.</div>
                            </div>
                            :
                            null
                        }
                    </Col>
                    <Col s={4} className="center margin-top-0">
                        {
                            (review.id === this.state.reviewIdBeingEdited) ?
                            <div>
                                <Row className="border-bottom edit-review-buttons">
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
                                <Row className="border-bottom edit-review-buttons">
                                        <div className="switch">
                                            <label>
                                            Private
                                            <input type="checkbox" checked={this.state.editPublicIsChecked} onChange={evt => this.updateInputValue(evt, 'editPublicIsChecked')}/>
                                            <span className="lever"></span>
                                            Public
                                            </label>
                                        </div>          
                                </Row>
                                <Row className="edit-review-buttons">
                                    <Button disabled={!this.state.editFileTypePasses} 
                                    onClick={() => this.toggleEditSaveHandler((review.id === this.state.reviewIdBeingEdited), review.tool_name,
                                                                            review.id, review.text, review.path,
                                                                            review.sharable, review.rating, review.answer_1,
                                                                            review.answer_2, review.answer_3, review.answer_4, review.answer_5)} 
                                    className="portal-buttons" 
                                    waves='light'> 
                                        Save 
                                        <Icon right tiny className="data">check</Icon>
                                    </Button>
                                </Row>
                                <Row className="edit-review-buttons">
                                    {
                                        this.props.files && this.props.files.filter(file => file.review_id == review.id).length  > 0 && (review.id === this.state.reviewIdBeingEdited) && review.path ?
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
                                                <img alt="pdf" className="canvas" src={`data:image/${review.path.substr(review.path.length - 3)};base64,${this.props.files.filter(file => file.review_id == review.id)[0].file}`} /> :
                                                null
                                            }
                                            </Modal>
                                    :
                                        null
                                    }
                                </Row>
                                {
                                    (review.id === this.state.reviewIdBeingEdited) && review.path ?
                                    <Row className="edit-review-buttons">
                                        <Button onClick={() => this.removeFileHandler(review.id)} className="portal-buttons delete-button" waves='light'> Remove File <Icon right tiny className="data">delete_outline</Icon></Button>
                                    </Row>
                                    :
                                    null
                                }
                                <Row>
                                    <Button onClick={() => this.deleteHandler(review.id)} className="portal-buttons edit-review-buttons delete-button" waves='light'> Delete Review <Icon right tiny className="data">delete_outline</Icon></Button>
                                </Row>
                            </div>
                            :
                            <div>
                                <Row className="border-bottom edit-review-buttons"></Row>
                                <Row className="valign-wrapper margin-top-bottom border-bottom edit-review-buttons">
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
                                    <Row className="edit-review-buttons">
                                        <Button onClick={() => this.toggleEditSaveHandler((review.id === this.state.reviewIdBeingEdited), review.tool_name, 
                                                                                        review.id, review.text,  review.path,
                                                                                        review.sharable, review.rating, review.answer_1,
                                                                                        review.answer_2, review.answer_3, review.answer_4, review.answer_5)} 
                                                className="portal-buttons" 
                                                waves='light'> 
                                                Edit 
                                                <Icon right tiny className="data">create</Icon> 
                                        </Button>
                                    </Row>
                                    :
                                    null
                                }
                                
                                <Row className="edit-review-buttons">
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
                                        this.props.files && this.props.files.filter(file => file.review_id == review.id).length  > 0  && (review.id !== this.state.reviewIdBeingEdited) && review.path ?
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
                                                <img alt="thumbnail" className="canvas" src={`data:image/${review.path.substr(review.path.length - 3)};base64,${this.props.files.filter(file => file.review_id == review.id)[0].file}`} /> :
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
      allTools: state.tools.allTools,
      sortoeQuestions: state.reviews.sortoeQuestions,
      role: state.auth.role
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    authenticate,
    getAllPublicReviews,
    postReview, 
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
    setPermissions,
    removeFile}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PublicReviews)
