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
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/login', options)
    .then(json => {
        console.log('LOGIN RESPONSE ', json)
        if(json.status === 200) {
            localStorage.setItem('username', object.loginUsername)
            return dispatch({ type:'LOGIN_SUCCESS' , payload: object.loginUsername})
        } else {
            window.Materialize.toast('Login Failed. This is most likely a wrong username or password.', 5000)
            var element = document.getElementById("toast-container");
              element.classList.add("failure");
            return dispatch({ type:'LOGIN_FAILED' })
        }
    })
    .catch(err => {
        console.log('ERROR WITH LOGIN REQUEST', err)
        window.Materialize.toast('Request Failed. Please Check Your Internet Connection and/or post your problem in the AAD-Users Slack Channel.', 10000)
        var element = document.getElementById("toast-container");
          element.classList.add("failure");
    })    
  }
