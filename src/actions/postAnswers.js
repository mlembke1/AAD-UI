export const postAnswers = (answers, tool_name, review_id, int_type) => dispatch => {
   let postObject = {} 
    postObject['answer_1'] = answers.question1Answer
    postObject['answer_2'] = answers.question2Answer
    postObject['answer_3'] = answers.question3Answer
    postObject['answer_4'] = answers.question4Answer
    postObject['answer_5'] = answers.question5Answer
    postObject["tool_name"] = tool_name
    postObject["review_id"] = review_id
    postObject["int_type"] = int_type
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/postAnswers', {
        method: "POST",
        body: JSON.stringify(postObject),
        withCredentials: true, 
        headers: { 'Content-Type': "application/json"}
    })
    .then(json => {
            if(json.status === 200) {
                return dispatch({ type:'POST_ANSWERS_SUCCESS' })
            } else {
                return dispatch({ type:'POST_ANSWERS_FAILED' })
            }
        })
        .catch(err => {
            return dispatch({ type:'POST_ANSWERS_FAILED' })
        }) 
  }