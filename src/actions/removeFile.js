export const removeFile = reviewId => dispatch => {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        credentials: 'include',
        crossDomain: true,
        method: 'PATCH',                                                              
        body: JSON.stringify( { reviewId } ) 
    }
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/removeFile', options)
    .then(result => result.json())
    .then(payload => {
      console.log('REMOVE FILE JSON RESPONSE', payload)
      window.Materialize.toast('Remove File Successful!', 1300)
      var element = document.getElementById("toast-container");
      element.classList.add("success");
      return dispatch({ type:'REMOVE_FILE_SUCCESS', payload: reviewId })
    })
    .catch(err => {
        window.Materialize.toast('Remove File Failed. Please Check Your Internet Connection and/or post your problem in the AAD-Users Slack Channel.', 10000)
      var element = document.getElementById("toast-container");
      element.classList.add("failure");
        return dispatch({ type: 'REMOVE_FILE_FAILED'})
    })
  }