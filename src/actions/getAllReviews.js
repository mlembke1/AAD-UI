export const getAllReviews = () => dispatch => {
    const options = {
        method: 'GET',
        credentials: 'include',
        crossDomain: true,
        headers:{
            'Content-Type': 'application/json'
          }
    }
    fetch((process.env.API_URL || 'http://localhost:3000') + '/getAllReviews', options)
    .then(r => r.json())
    .then(payload => {
      console.log('REVIEWS JSON RESPONSE', payload)
      return dispatch({ type:'REVIEWS_AQUIRED', payload })
    })
    .catch(err => {
        return dispatch({ type: 'REIVEW_AQUISITION_FAILED'})
    })
}