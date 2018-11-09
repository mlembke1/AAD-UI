import axios from 'axios';

export const postReview = (
        toolNameInputValue,
        textInputValue,
        fileInputValue,
        username,
        publicIsChecked,
        firstName,
        lastName,
        jobTitle,
        company,
        rangeValue,
        sortoeAnswers
) => dispatch => {

    let formData = new FormData();
    toolNameInputValue ? formData.append('toolName', toolNameInputValue) : null
    textInputValue ? formData.append('text', textInputValue) : null
    fileInputValue ? formData.append('uploadedFile', fileInputValue) : null
    username ? formData.append('username', username) : null
    publicIsChecked ? formData.append('sharable', publicIsChecked) : null
    firstName ? formData.append('firstName', firstName) : null
    lastName ? formData.append('lastName', lastName) : null
    jobTitle ? formData.append('jobTitle', jobTitle) : null
    company ? formData.append('company', company) : null
    rangeValue ? formData.append('rating', rangeValue) : null
    if (toolNameInputValue == 'MEADE/SORT-OE') {
        formData.append('answer_1', sortoeAnswers.question1Answer)
        formData.append('answer_2', sortoeAnswers.question2Answer)
        formData.append('answer_3', sortoeAnswers.question3Answer)
        formData.append('answer_4', sortoeAnswers.question4Answer)
        formData.append('answer_5', sortoeAnswers.question5Answer)
    }

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