export const getAllReviews = () => dispatch => {
    fetch('http://localhost:3000/getAllReviews')
    .then(r => r.json())
    .then(payload => {
      console.log('REVIEWS JSON RESPONSE', payload)
      return dispatch({ type:'REVIEWS_AQUIRED', payload })
    })
    .catch(err => {
        return dispatch({ type: 'REIVEW_AQUISITION_FAILED'})
    })
}