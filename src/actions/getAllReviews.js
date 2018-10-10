export const getAllReviews = () => dispatch => {
    const options = {
        method: 'GET',
        credentials: 'include',
        crossDomain: true,
        headers:{
            'Content-Type': 'application/json'
          }
    }
    const username = localStorage.getItem('username')
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + `/getAllReviews/${username}`, options)
    .then(r => r.json())
    .then(payload => {
        console.log('HERE ARE THE REVIEWS', payload)
      return dispatch({ type:'REVIEWS_AQUIRED', payload })
    })
    .catch(err => {
        return dispatch({ type: 'REIVEW_AQUISITION_FAILED'})
    })
}