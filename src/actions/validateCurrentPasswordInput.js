export const validateCurrentPasswordInput = (username, currentPasswordInput) => dispatch => {
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + `/validateCurrentPasswordInput/${username}/${currentPasswordInput}`)
    .then(r => r.json())
    .then(json => {
        console.log('HERE IS THE RESPONSE FROM VALIDATE CURRENT PASSWORD INPUT', json)
        if(json.message == "Success") {
          return dispatch({ type:'VALID_CURRENT_PASSWORD_INPUT' })
        } else {
          return dispatch({ type:'INVALID_CURRENT_PASSWORD_INPUT' })
        }
    })
    .catch(err => err)
  
}
