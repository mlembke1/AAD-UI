export const postBlob = (blob) => dispatch => {
    const options = {
        method: 'POST',
        body: blob,
        headers: {
        "Content-Type": blob.type
        },
        credentials: 'include',
        crossDomain: true
    }
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/postBlob', options)
        .then(json => {
        console.log('POST_BLOB RESPONSE ', json)
        if(json.status === 200) {
            return dispatch({ type:'POST_BLOB_SUCCESS' })
        } else {
            return dispatch({ type:'POST_BLOB_FAILED' })
        }
    })
    .catch(err => {
        console.log('ERROR WITH POST_BLOB REQUEST', err)
        return dispatch({ type:'POST_BLOB_FAILED' })
    })    
  }