export const editSaveToggle = (editable, reviewId) => dispatch => {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        credentials: 'include',
        crossDomain: true,
        method: 'PATCH',                                                              
        body: JSON.stringify( { editable, reviewId } ) 
    }
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/editSaveToggle', options)
    .then(payload => {
      return dispatch({ type:'TOGGLE_EDIT_SAVE', payload })
    })
    .catch(err => {
        return dispatch({ type: 'TOGGLE_EDIT_SAVE_FAILED'})
    })
  }