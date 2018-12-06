export const getAllPublicReviews = () => dispatch => {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            credentials: 'include',
            crossDomain: true,
            headers:{
                'Content-Type': 'application/json'
              }
        }
        fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + `/getAllPublicReviews`, options)
        .then(r => r.json())
        .then(payload => {
          return resolve(dispatch({ type:'PUBLIC_REVIEWS_AQUIRED', payload }))
        })
        .catch(err => {
            return reject(dispatch({ type: 'PUBLIC_REIVEW_AQUISITION_FAILED'}))
        })
    })
}