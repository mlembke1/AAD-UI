export const loginUser = (object) => dispatch => {
    const options = {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
        "Content-Type": "application/json"
        },
        credentials: 'include',
        crossDomain: true
    }
    fetch('http://localhost:3000/login', options)
    .then(json => {
        console.log('LOGIN RESPONSE ', json)
        if(json.status === 200) {
            return dispatch({ type:'LOGIN_SUCCESS' })
        } else {
            return dispatch({ type:'LOGIN_FAILED' })
        }
    })
    .catch(err => {
        console.log('ERROR WITH LOGIN REQUEST', err)
        return dispatch({ type:'LOGIN_FAILED' })
    })    
  }