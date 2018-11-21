import axios from 'axios';
export const updateUsername = (currentUsername, newUsername) => dispatch => {
    axios((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/updateUsername', {
        method: "patch",
        data: { currentUsername, newUsername }
    })
    .then(payload => { 
        window.Materialize.toast('Username Update Successful!', 2300)
        var element = document.getElementById("toast-container");
        element.classList.add("success");
        return dispatch({ type:'UPDATE_USERNAME_SUCCESS', payload: newUsername })
    })
    .catch(err => { 
        window.Materialize.toast('Update Failed. Please Check Your Internet Connection and/or post your problem in the AAD-Users Slack Channel.', 10000)
        var element = document.getElementById("toast-container");
        element.classList.add("failure");
        return dispatch({ type: 'UPDATE_USERNAME_FAILED'})
    })
  }