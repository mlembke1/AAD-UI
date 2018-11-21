import axios from 'axios';
export const updatePassword = (username, currentPassword, newPassword) => dispatch => {
    axios((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/updatePassword', {
        method: "patch",
        data: { username, currentPassword, newPassword },
        withCredentials: true,
        headers: {'Content-Type': "application/json"}
    })
    .then(payload => {
        window.Materialize.toast('Password Update Successful!', 2300) 
        var element = document.getElementById("toast-container");
        element.classList.add("success");
        return dispatch({ type:'UPDATE_PASSWORD_SUCCESS' })
    })
    .catch(err => {
        window.Materialize.toast('Update Failed. Please Check Your Internet Connection and/or post your problem in the AAD-Users Slack Channel.', 10000)
        var element = document.getElementById("toast-container");
        element.classList.add("failure");
        return dispatch({ type: 'UPDATE_PASSWORD_FAILED'})
    })
  }