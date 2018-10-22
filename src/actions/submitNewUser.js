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
            window.Materialize.toast('Signup Failed. Please Check Your Internet Connection and/or contact the administrator.', 10000)
            var element = document.getElementById("toast-container");
            element.classList.add("failure");
            return dispatch({ type:'SIGNUP_FAILED' })
        }
    })
    .catch(err => {
        console.log('ERROR WITH SIGNUP REQUEST', err)
        window.Materialize.toast('Signup Failed. Please Check Your Internet Connection and/or contact the administrator.', 10000)
        var element = document.getElementById("toast-container");
        element.classList.add("failure");
        return dispatch({ type:'SIGNUP_FAILED' })
    })    
  }
