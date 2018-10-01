export const getAllReviewsLength = () => dispatch => {
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/getAllReviewsLength')
    .then(r => r.json())
    .then(payload => {
      return dispatch({ type:'ALL_REVIEWS_LENGTH_AQUIRED', payload })
    })
    .catch(err => {
        return dispatch({ type: 'ALL_REVIEWS_LENGTH_AQUISITION_FAILED'})
    })
}