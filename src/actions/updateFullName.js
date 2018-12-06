import axios from 'axios';
export const updateFullName = (user_id, firstName, lastName, username, company, jobTitle) => dispatch => {
    return new Promise((resolve, reject) => {
        axios((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/updateFullName', {
            method: "patch",
            data: { user_id, firstName, lastName, username, company, jobTitle }
        })
        .then(payload => { 
            window.Materialize.toast('Full Name Update Successful!', 2300)
            var element = document.getElementById("toast-container");
            element.classList.add("success");
            return resolve(dispatch({ type:'UPDATE_FULL_NAME_SUCCESS', payload: {firstName, lastName} }))
        })
        .catch(err => { 
            window.Materialize.toast('Update Failed. Please Check Your Internet Connection and/or post your problem in the AAD-Users Slack Channel.', 10000)
            var element = document.getElementById("toast-container");
            element.classList.add("failure");
            return reject(dispatch({ type: 'UPDATE_FULL_NAME_FAILED'}))
        })
    })
  }