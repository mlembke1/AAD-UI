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
        sortoeAnswers, 
        lastReviewID
) => dispatch => {
    let formData = new FormData();
    formData.append('toolName', toolNameInputValue)
    formData.append('text', textInputValue)
    formData.append('username', username)
    formData.append('sharable', publicIsChecked)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('jobTitle', jobTitle)
    formData.append('company', company)
    formData.append('rating', rangeValue)
    if(fileInputValue) formData.append('uploadedFile', fileInputValue) 
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
            if(json.status === 200) {
                window.Materialize.toast('Post Successful!', 1300)
                const element = document.getElementById("toast-container");
                element.classList.add("success");
                return dispatch({ type:'POST_REVIEW_SUCCESS' })
            } else {
                window.Materialize.toast('Post Failed. Please Check Your Internet Connection and/or post your problem in the Slack Channel', 3300)
                const element = document.getElementById("toast-container");
                element.classList.add("failure");
                return dispatch({ type:'POST_REVIEW_FAILED' })
            }
        })
        .catch(err => {
            window.Materialize.toast('Post Failed. Please Check Your Internet Connection and/or post your problem in the AAD-Users Slack Channel.', 10000)
            const element = document.getElementById("toast-container");
            element.classList.add("failure");
            return dispatch({ type:'POST_REVIEW_FAILED' })
        }) 
  }