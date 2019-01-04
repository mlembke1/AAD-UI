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
        if(json.status === 200) {
            const objectToStore = {"username": object.signupUsername, timestamp: new Date().getTime()}
            localStorage.setItem("loggedIn", JSON.stringify(objectToStore))
            window.location.reload()
            return dispatch({ type:'SIGNUP_SUCCESS' , payload: object.signupUsername})
        } else {
            window.Materialize.toast('Signup Failed. Please fill out the appropriate fields.', 7000)
            const element = document.getElementById("toast-container");
            element.classList.add("failure");
            return dispatch({ type:'SIGNUP_FAILED' })
        }
    })
    .catch(err => {
        window.Materialize.toast('Request Failed. Please Check Your Internet Connection and/or contact the administrator.', 10000)
        const element = document.getElementById("toast-container");
        element.classList.add("failure");
        return dispatch({ type:'SIGNUP_FAILED' })
    })    
  }
