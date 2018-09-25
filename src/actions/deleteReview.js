export const deleteReview = reviewId => dispatch => {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        credentials: 'include',
        crossDomain: true,
        method: 'DELETE',                                                              
        body: JSON.stringify( { reviewId } ) 
    }
    fetch('http://localhost:3000/deleteReview', options)
    .then(payload => {
      console.log('DELETE REVIEW JSON RESPONSE', payload)
      return dispatch({ type:'DELETE_REVIEW_SUCCESS', payload })
    })
    .catch(err => {
        return dispatch({ type: 'DELETE_REVIEW_FAILED'})
    })
  }