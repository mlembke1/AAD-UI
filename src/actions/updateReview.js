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
      var element = document.getElementById("toast-container");
      element.classList.add("success");
      return dispatch({ type:'UPDATE_REVIEW_SUCCESS' })
    })
    .catch(err => {
        window.Materialize.toast('Update Failed. Please Check Your Internet Connection and/or post your problem in the AAD-Users Slack Channel.', 10000)
      var element = document.getElementById("toast-container");
      element.classList.add("failure");
        return dispatch({ type: 'UPDATE_REVIEW_FAILED'})
    })
  }