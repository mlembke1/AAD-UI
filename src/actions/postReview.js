import axios from 'axios';

export const postReview = object => dispatch => {
    console.log('HERE IS THE OBJECT TO POST', object)
    let formData = new FormData();

    if(object.blob){
        formData.append('uploadedFile', object.blob);      
    }
    formData.append('text', object.textInput);
    formData.append('toolName', object.toolName);
    formData.append('username', object.username);
    axios((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/postReview', {
        method: "post",
        data: formData,
        withCredentials: true
    })
    .then(json => {
            console.log('POST_REVIEW RESPONSE ', json)
            if(json.status === 200) {
                window.Materialize.toast('Post Successful!', 1300)
                var element = document.getElementById("toast-container");
                element.classList.add("success");
                return dispatch({ type:'POST_REVIEW_SUCCESS' })
            } else {
                window.Materialize.toast('Post Failed. Please Check Your Internet Connection and/or post your problem in the Slack Channel', 3300)
                var element = document.getElementById("toast-container");
                element.classList.add("failure");
                return dispatch({ type:'POST_REVIEW_FAILED' })
            }
        })
        .catch(err => {
            console.log('ERROR WITH POST_REVIEW REQUEST', err)
            window.Materialize.toast('Post Failed. Please Check Your Internet Connection and/or post your problem in the AAD-Users Slack Channel.', 10000)
            var element = document.getElementById("toast-container");
            element.classList.add("failure");
            return dispatch({ type:'POST_REVIEW_FAILED' })
        }) 
  }