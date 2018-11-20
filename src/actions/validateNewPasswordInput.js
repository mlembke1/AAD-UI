export const validateNewPasswordInput = (username, newPasswordInput) => dispatch => {
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + `/validateNewPasswordInput/${username}/${newPasswordInput}`)
    .then(r => r.json())
    .then(json => {
        if(json.message == "fail") {
          return dispatch({ type:'VALID_NEW_PASSWORD_INPUT' })
        } else {
          return dispatch({ type:'INVALID_NEW_PASSWORD_INPUT' })
        }
    })
    .catch(err => err)
  
}
