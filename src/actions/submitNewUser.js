export const submitNewUser = (object) => dispatch => {
    const options = {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
        "Content-Type": "application/json"
        },
        credentials: 'include',
        crossDomain: true
    }
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/signup', options)
    .then(json => {
        console.log('SIGNUP RESPONSE ', json)
        if(json.status === 200) {
            localStorage.setItem('username', object.signupUsername)
            return dispatch({ type:'SIGNUP_SUCCESS' , payload: object.signupUsername})
        } else {
            return dispatch({ type:'SIGNUP_FAILED' })
        }
    })
    .catch(err => {
        console.log('ERROR WITH SIGNUP REQUEST', err)
        return dispatch({ type:'SIGNUP_FAILED' })
    })    
  }
