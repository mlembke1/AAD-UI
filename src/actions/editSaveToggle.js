export const editSaveToggle = (editable, toolName) => dispatch => {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        method: 'PATCH',                                                              
        body: JSON.stringify( { editable, toolName } ) 
    }
    fetch('http://localhost:3000/toggleEditSave', options)
    .then(r => r.json())
    .then(payload => {
      console.log('EDIT TOGGLE JSON RESPONSE', payload)
      return dispatch({ type:'TOGGLE_EDIT_SAVE', payload })
    })
    .catch(err => {
        return dispatch({ type: 'TOGGLE_EDIT_SAVE_FAILED'})
    })
  }