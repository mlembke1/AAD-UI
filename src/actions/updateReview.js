import axios from 'axios';
export const updateReview = (object) => dispatch => {
    let formData = new FormData();

    if(object.blob){
        formData.append('uploadedFile', object.blob);     
    }
    formData.append('text', object.text)
    formData.append('toolName', object.toolName)
    formData.append('reviewId', object.reviewId)
    axios((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/updateReview', {
        method: "patch",
        data: formData,
        withCredentials: true
    })
    .then(payload => {
      console.log('UPDATE REVIEW JSON RESPONSE', payload)
      window.Materialize.toast('Update Successful!', 1300)
      return dispatch({ type:'UPDATE_REVIEW_SUCCESS' })
    })
    .catch(err => {
        return dispatch({ type: 'UPDATE_REVIEW_FAILED'})
    })
  }