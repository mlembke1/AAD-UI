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
            if(json.status === 200) {
                const objectToStore = {username: object.loginUsername, timestamp: new Date().getTime()}
                localStorage.setItem("loggedIn", JSON.stringify(objectToStore))
                window.location.reload()
                return dispatch({ type:'LOGIN_SUCCESS' , payload: object.loginUsername})
            } else {
                window.Materialize.toast('Login Failed. This is most likely a wrong username or password.', 5000)
                const element = document.getElementById("toast-container");
                  element.classList.add("failure");
                return dispatch({ type:'LOGIN_FAILED' })
            }
        })
        .catch(err => {
            window.Materialize.toast('Request Failed. Please Check Your Internet Connection and/or post your problem in the AAD-Users Slack Channel.', 10000)
            const element = document.getElementById("toast-container");
            element.classList.add("failure");
        })   
  }
