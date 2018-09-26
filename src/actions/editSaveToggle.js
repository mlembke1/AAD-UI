export const editSaveToggle = (editable, toolName, reviewId) => dispatch => {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        credentials: 'include',
        crossDomain: true,
        method: 'PATCH',                                                              
        body: JSON.stringify( { editable, toolName, reviewId } ) 
    }
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/editSaveToggle', options)
    .then(payload => {
      console.log('EDIT TOGGLE JSON RESPONSE', payload)
      return dispatch({ type:'TOGGLE_EDIT_SAVE', payload })
    })
    .catch(err => {
        return dispatch({ type: 'TOGGLE_EDIT_SAVE_FAILED'})
    })
  }