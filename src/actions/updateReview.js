export const updateReview = (toolName, text, reviewId) => dispatch => {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        credentials: 'include',
        crossDomain: true,
        method: 'PATCH',                                                              
        body: JSON.stringify( { toolName, text, reviewId } ) 
    }
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/updateReview', options)
    .then(payload => {
      console.log('UPDATE REVIEW JSON RESPONSE', payload)
      return dispatch({ type:'UPDATE_REVIEW_SUCCESS', payload })
    })
    .catch(err => {
        return dispatch({ type: 'UPDATE_REVIEW_FAILED'})
    })
  }