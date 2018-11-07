import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Reviews.css';
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
import { getUserInfo } from '../../actions/getUserInfo'
import { getAllReviews } from '../../actions/getAllReviews'
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
import SortoeQForm from '../SortoeQform/SortoeQform'
import SubHeader from '../SubHeader/SubHeader'
import { Icon, Input, Section, Row, Col, Button, Collapsible, CollapsibleItem, Modal } from 'react-materialize'
import { Redirect } from 'react-router-dom'





class Reviews extends Component {

    constructor(props) {
        super(props)
        this.state = {
            toolNameInputValue: 'MEADE/SORT-OE',
            textInputValue: '',
            editToolNameInputValue: 'MEADE/SORT-OE',
            editTextInputValue: '',
            editPublicIsChecked: "",
            fileInputValue: null,
            editFileInputValue: null,
            fileTypePasses: true,
            editFileTypePasses: true,
            postStarted: false,
            publicIsChecked: true,
            rangeValue: 50,
            editRangeValue: 50
        }
    }

    onCheckSlack = () => this.setState({...this.state, slackIsChecked: !this.state.slackIsChecked})

    
    componentWillMount = () => {
        this.props.checkCookie()
        this.props.getUserInfo()
        this.props.getAllReviews()
        setTimeout( () => {
            if(this.props.reviewsRequestFinished) {
                if(!this.props.allReviews || this.props.allReviews.length < 1){
                        this.props.clearFiles()
                } else {
                        this.props.allReviews.map((review, i) => {
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
            this.props.getAllReviews()
            setTimeout(() => {
                if(this.props.reviewsRequestFinished){
                    this.props.allReviews.map((review, i) => {
                        if(this.props.files && (this.props.files.filter(file => file.review_id == review.id).length < 1) && review.path != null){
                                this.props.getFile(review.path.substring(15), review.id)
                            }
                    })
                }
            }, 1000)
            
            if (this.props.files.length == this.props.allReviews.filter(review => review.path).length) {
                this.props.setPostCompleteFalse()
                this.props.setUpdateCompleteFalse()
                this.props.setDeleteCompleteFalse()
                this.props.setRemoveFileCompleteFalse()
            }
        }
    }

    updateInputValue(evt, inputType) {
        // IF THE INPUT DOES NOT CONAINT FILES THE FOLLOWING WILL EXECUTE
        if(inputType != "fileInputValue" && inputType != "editFileInputValue" && inputType !== 'editPublicIsChecked' ){
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
    setTimeout(() => this.props.getAllReviews(), 200)
    setTimeout(() => {
    if(this.props.allReviews.length < 1){
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
                sharable: this.state.editPublicIsChecked,
                rating: this.state.editRangeValue
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
        this.props.editSaveToggle(editable, toolName, reviewId, sharable, rating)
        this.setState({
            ...this.state,
            editToolNameInputValue: toolName,
            editTextInputValue: text,
            editPublicIsChecked: sharable,
            editRangeValue: rating
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

  postReviewHandler = async () => {

    this.setState({
        ...this.state,
        postStarted: true
    })
    let reviewObject
      if(this.state.fileInputValue){
        reviewObject = {
            toolName: this.state.toolNameInputValue,
            textInput: this.state.textInputValue,
            blob: this.state.fileInputValue,
            username: localStorage.getItem('username'),
            sharable: this.state.publicIsChecked,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            jobTitle: this.props.jobTitle,
            company: this.props.company,
            rating: this.state.rangeValue
        }      
      } else {
        reviewObject = {
              toolName: this.state.toolNameInputValue,
              textInput: this.state.textInputValue,
              username: localStorage.getItem('username'),
              sharable: this.state.publicIsChecked,
              firstName: this.props.firstName,
              lastName: this.props.lastName,
              jobTitle: this.props.jobTitle,
              company: this.props.company,
              rating: this.state.rangeValue
        }  
      } 
      
    this.props.postReview(reviewObject)
    this.setState({
        toolNameInputValue: 'MEADE/SORT-OE',
        textInputValue: "",
        fileInputValue: null
    })
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

  onCheckPublic = () => this.setState({...this.state, publicIsChecked: !this.state.publicIsChecked})

  render() {
    if(!this.props.username){
        return <Redirect to="/" />
      } else {
      return (
        <div>
          {/* ////////////////////  ///////   ///////////////////////// */}
          {/* ////////////////////  HEADER    ///////////////////////// */}
          {/* ////////////////////  ///////   ///////////////////////// */}
          <SubHeader icon={require("../../assets/assessment_icon.png")} subHeader="Your Assessments"/>

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
                                <option value='MEADE/SORT-OE'>MEADE/SORT-OE</option>
                                <option value='Argument Mapper'>Argument Mapper</option>
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
                                s={12} 
                                onChange={evt => this.updateInputValue(evt, 'editTextInputValue')}
                                disabled={false} type='textarea' value={this.state.editTextInputValue} />
                            :
                                <Input s={12}  disabled={true} type='textarea' value={review.text} />
                            }
                        </Row>
                        {
                            review.editable ?
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
                                                <img className="file"  src={window.URL.createObjectURL(this.state.editFileInputValue)} />
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
                                        label={review.path ? <span>Replace<Icon right tiny  className="data">cloud_upload</Icon></span> : <span>Upload<Icon right tiny  className="data">cloud_upload</Icon></span>}  
                                        name="fileUpload"
                                        s={12} 
                                        placeholder={`${review.path ? review.path : `(.jpg/.png/.jpeg) or a .pdf.`}`}
                                        onChange={evt => this.updateInputValue(evt, 'editFileInputValue')} />
                                    </Row>
                                    }
                                </Row>
                            :
                                null
                        }
                        {
                            !this.state.editFileTypePasses && review.editable ?
                            <div>
                                <div className="error-text">File must be a picture(.jpg/.png/.jpeg) or a .pdf.</div>
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
                                <Row>
                                        <p>Overall {this.state.toolNameInputValue} rating: 
                                            <span className={`bold ${this.applyColor(this.state.editRangeValue) }`}>{this.state.editRangeValue}% </span></p>
                                        <p class="range-field maxWidth70 center">
                                            <input 
                                            type="range"
                                            value={this.state.editRangeValue}
                                            onChange={evt => this.updateInputValue(evt, 'editRangeValue')}
                                            min="0" max="100" />
                                        </p>
                                </Row>
                                <Row>
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
                                    <Button disabled={!this.state.editFileTypePasses} onClick={() => this.toggleEditSaveHandler(review.editable, review.tool_name, review.id, review.text, review.path, review.sharable, review.rating)} className="portal-buttons" waves='light'> Save <Icon right tiny className="data">check</Icon></Button>
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
                                        <Button onClick={() => this.removeFileHandler(review.id)} className="portal-buttons delete-button" waves='light'> Remove Current File <Icon right tiny className="data">delete_outline</Icon></Button>
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
                                <br />
                                <Row className="valign-wrapper maxWidth70">
                                    <Col className="border-bottom standard-height" s={6}>
                                            <div className={`bold ${this.applyColor(review.rating) }`}>{review.rating}% </div>
                                    </Col>
                                    <Col className="border-bottom standard-height" s={6}>
                                    {
                                        review.sharable ?
                                        <div className="margin-top-neg"> Public <Icon >public</Icon></div>
                                        :
                                        <div className="margin-top-neg"> Private <Icon >security</Icon></div>
                                    }
                                    </Col>
                                </Row>
                                <Row>
                                    <Button onClick={() => this.toggleEditSaveHandler(review.editable, review.tool_name, review.id, review.text,  review.path, review.sharable, review.rating)} className="portal-buttons" waves='light'> Edit <Icon right tiny className="data">create</Icon> </Button>
                                </Row>
                                <Row>
                                    {
                                        (this.props.files.length != this.props.allReviews.filter(review => review.path).length) && review.path ?
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

            {/* //////////////////// ////////////////////   //////////////////// //////////////////// ////////////////////  ///////////////////////// */}
            {/* //////////////////// ////////////////////   //////////////////// //////////////////// ////////////////////  ///////////////////////// */}
            {/* //////////////////// ////////////////////              ADD A REVIEW SECTION             ///////////////////////// */}
            {/* //////////////////// ////////////////////  //////////////////// //////////////////// ////////////////////  ///////////////////////// */}
            {/* //////////////////// ////////////////////   //////////////////// //////////////////// ////////////////////  ///////////////////////// */}
            <Section className="reviews-wrapper center">
                <Collapsible id="add-review-collapsible" popout defaultActiveKey={1}>
                <CollapsibleItem header='Write A Review' icon='add'>
                    <Section>
                        <Row className="valign-wrapper max-width-50">
                            <Input  
                            className="center-align"
                            s={12}
                            onChange={evt => this.updateInputValue(evt, 'toolNameInputValue')} 
                            value={this.state.toolNameInputValue}
                            type='select' label="Choose A Tool" >
                                <option value='MEADE/SORT-OE'>MEADE/SORT-OE</option>
                                <option value='Argument Mapper'>Argument Mapper</option>
                            </Input>
                        </Row>
                        <Row>
                            <Col s={12}>
                                {
                                    this.state.toolNameInputValue == 'MEADE/SORT-OE' ?
                                    <SortoeQForm />
                                    :
                                    <p>No Question Form Available for this tool just yet.</p>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Collapsible popout default defaultActiveKey={2}>
                                <CollapsibleItem header="Additional Comments / File Upload" icon="add">
                                <Row className="valign-wrapper">
                                            <Col s={8}>
                                                <Input 
                                                s={12}
                                                className="text-align-center"
                                                type='textarea'
                                                value={this.state.textInputValue}
                                                onChange={evt => this.updateInputValue(evt, 'textInputValue')}
                                                placeholder="Comment here..." />
                                            </Col>
                                            {
                                                !this.state.fileInputValue ?
                                                <Col s={4}>
                                                    <Row>
                                                        <Col s={2}></Col>
                                                        <Col s={10}>
                                                            <Input
                                                            id="file-input"
                                                            type="file"
                                                            label={<span>Upload<Icon right tiny  className="data">cloud_upload</Icon></span>}
                                                            name="fileUpload"
                                                            placeholder="(.jpg/.png/.jpeg) or a .pdf"
                                                            onChange={evt => this.updateInputValue(evt, 'fileInputValue')} />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                : 
                                                <Col s={4}>
                                                            {
                                                                this.state.fileInputValue && this.state.fileTypePasses ?
                                                                    this.state.fileInputValue.type.substring(0, 5) !== 'image' ?
                                                                    <Row>
                                                                        <Row className="">
                                                                                <div className="non-image-file file" >
                                                                                    {this.state.fileInputValue.name}
                                                                                    {this.state.fileInputValue.type}
                                                                                    <Icon small className="data icon-green">check_circle_outline</Icon>
                                                                                </div>
                                                                        </Row>
                                                                        <Row>
                                                                            <Button onClick={() => this.setState({ ...this.state, fileInputValue: null })} className="portal-buttons delete-button min-width-100" waves='light'> Remove Staged Upload <Icon right tiny className="data">delete_outline</Icon></Button>
                                                                        </Row>
                                                                    </Row>
                                                                    :
                                                                    <Row>
                                                                        <Row className="">
                                                                                <div>
                                                                                    <img className="file"  src={window.URL.createObjectURL(this.state.fileInputValue)} />
                                                                                </div>
                                                                        </Row>
                                                                        <Row>
                                                                            <Button onClick={() => this.setState({ ...this.state, fileInputValue: null })} className="portal-buttons delete-button min-width-100" waves='light'> Remove Staged Upload <Icon right tiny className="data">delete_outline</Icon></Button>
                                                                        </Row>
                                                                    </Row>
                                                                :
                                                                null
                                                            }
                                                </Col>
                                            }
                                        {
                                            !this.state.fileTypePasses ?
                                            <div>
                                                <div className="error-text">File must be a picture(.jpg/.png/.jpeg) or a .pdf.</div>
                                                <div className="error-text">Please ensure file extensions are all lowercase.</div>
                                            </div>
                                            :
                                            null
                                        }
                                </Row>
                                </CollapsibleItem>
                            </Collapsible>
                        </Row>
                        <Row className="valign-wrapper">
                            <Col s={6} className="center">
                                <Row className="border-bottom">
                                <p>Overall {this.state.toolNameInputValue} rating: 
                                    <span className={`bold ${this.applyColor(this.state.rangeValue) }`}>{this.state.rangeValue}% </span></p>
                                <p class="range-field">
                                    <input 
                                    type="range"
                                    value={this.state.rangeValue}
                                    onChange={evt => this.updateInputValue(evt, 'rangeValue')}
                                     min="0" max="100" />
                                </p>
                                </Row>
                            </Col>
                            <Col s={6}>
                                <Row className="border-bottom">
                                    <div className="switch tooltip">
                                        <label>
                                        Private
                                        <input type="checkbox" checked={this.state.publicIsChecked} onChange={() => this.onCheckPublic()}/>
                                        <span className="lever"></span>
                                        Public
                                        </label>
                                        <span className="tooltiptext">Would you like this review to be made public?</span>
                                    </div>
                                </Row>
                                <Row>
                                    {
                                        this.props.allQuestionsAreIndifferent ?
                                            <Modal
                                            id="submit-modal"
                                            header='Confirmation'
                                            trigger={
                                                <Button 
                                                    disabled={ !this.state.fileTypePasses }
                                                    className="portal-buttons" waves='light'>
                                                    <Icon right className="data">send</Icon>
                                                    Submit Review 
                                                </Button>            
                                            }>
                                            <Row className="valign-wrapper">
                                                <Col s={8}>
                                                    <p>You have left all of the fields marked as <span className="bold">"Indifferent"</span> and have given {this.state.toolNameInputValue} an overall rating of<span className={`bold ${this.applyColor(this.state.rangeValue) }`}>{this.state.rangeValue}% </span>. Would you still like to submit your review?</p>
                                                </Col>
                                                <Col s={4}>
                                                <Button 
                                                    disabled={ !this.state.fileTypePasses }
                                                    onClick={() => this.postReviewHandler()} className="portal-buttons modal-close" waves='light'>
                                                    <Icon right className="data">send</Icon>
                                                    Submit Review 
                                                </Button>            
                                                </Col>
                                            </Row>
                                            </Modal>
                                        :
                                            <div>
                                                <Button 
                                                    disabled={ !this.state.fileTypePasses }
                                                    onClick={() => this.postReviewHandler()} className="portal-buttons" waves='light'>
                                                    <Icon left className="data">send</Icon>
                                                    Submit Review 
                                                </Button>            
                                                {
                                                    !this.props.postComplete && this.state.postStarted ?
                                                    <div className="progress">
                                                        <div className="indeterminate"></div>
                                                    </div>
                                                    :
                                                    null
                                                }
                                            </div>
                                    }
                                </Row>
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
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
      firstName: state.auth.firstName,
      lastName: state.auth.lastName,
      jobTitle: state.auth.jobTitle,
      company: state.auth.company,
      allReviews: state.reviews.allReviews,
      files: state.reviews.files,
      postComplete: state.reviews.postComplete,
      updateComplete: state.reviews.updateComplete,
      deleteComplete: state.reviews.deleteComplete,
      removeFileComplete: state.reviews.removeFileComplete,
      reviewsRequestFinished: state.reviews.reviewsRequestFinished,
      allQuestionsAreIndifferent: state.reviews.allQuestionsAreIndifferent
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
    setPostCompleteFalse,
    setUpdateCompleteFalse,
    setDeleteCompleteFalse,
    setRemoveFileCompleteFalse,
    getUserInfo,
    removeFile}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
