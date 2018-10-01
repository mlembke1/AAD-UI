export const getAllBlobs = () => dispatch => {
    const options = {
        method: 'GET',
        credentials: 'include',
        crossDomain: true,
        headers:{
            'Content-Type': 'application/json'
          }
    }
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/getAllBlobs', options)
    .then(r => r.json())
    .then(payload => {
      console.log('BLOBS JSON RESPONSE', payload)
      return dispatch({ type:'BLOBS_AQUIRED', payload })
    })
    .catch(err => {
        return dispatch({ type: 'BLOB_AQUISITION_FAILED'})
    })
}