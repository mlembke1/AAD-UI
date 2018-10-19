export const getFile = (path, reviewId, lastFileToBeFetched) => dispatch => {
    const options = {
      responseType: 'blob'
    }
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + `/getFile/${path}/${reviewId}`, options)
    .then(response => {
      return response.json()
    }).then (response => {
      if(response.file != 'none'){
        console.log('HERE ARE THE FILES BEING BROUGHT BACK.', response)
        if (lastFileToBeFetched){
          return dispatch({ type: 'FILES_AQUIRED', payload: {response, lastFileToBeFetched: true } })
        } else {
          return dispatch({ type: 'FILES_AQUIRED', payload: {response}})
        }
      } else {
        return dispatch({ type: 'FILE_DOES_NOT_EXIST' })
      }
    })
    .catch(err => {
        return dispatch({ type: 'FILES_AQUISITION_FAILED'})
    })
  }