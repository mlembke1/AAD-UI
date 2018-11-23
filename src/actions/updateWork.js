import axios from 'axios';
export const updateWork = (user_id, company, jobTitle) => dispatch => {
    axios((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/updateWork', {
        method: "patch",
        data: { user_id, company, jobTitle }
    })
    .then(payload => { 
        window.Materialize.toast('Full Name Update Successful!', 2300)
        var element = document.getElementById("toast-container");
        element.classList.add("success");
        return dispatch({ type:'UPDATE_WORK_SUCCESS', payload: { company, jobTitle } })
    })
    .catch(err => { 
        window.Materialize.toast('Update Failed. Please Check Your Internet Connection and/or post your problem in the AAD-Users Slack Channel.', 10000)
        var element = document.getElementById("toast-container");
        element.classList.add("failure");
        return dispatch({ type: 'UPDATE_WORK_FAILED'})
    })
  }