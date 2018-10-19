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
        window.Materialize.toast('File Removed Successful!', 1300)
      return dispatch({ type:'REMOVE_FILE_SUCCESS', payload: reviewId })
    })
    .catch(err => {
        return dispatch({ type: 'REMOVE_FILE_FAILED'})
    })
  }