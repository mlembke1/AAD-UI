export const getAnswers = selected_tool_name => dispatch => {
    const options = {
        method: 'GET',
        credentials: 'include',
        crossDomain: true,
        headers:{
            'Content-Type': 'application/json'
          }
    }
    let tool_name = selected_tool_name === "MEADE/SORT-OE" ? "MEADE" : selected_tool_name
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + `/getAnswers/${tool_name}`, options)
    .then(r => r.json())
    .then(payload => {
        let newAnswersArray = []
        payload.map(answerObject => { 
            let newAnswerObject = {}
            for (let key in answerObject) {
                if ((key.substring(0, 6) === "answer" && answerObject[key] !== null) ||
                    key === "review_id" || key === "tool_name") {
                    newAnswerObject[key] =  answerObject[key]
                }
            }
            newAnswersArray.push(newAnswerObject)
         })
        console.log('here is the new answers array', newAnswersArray)
      return dispatch({ type:'ANSWERS_AQUIRED', payload })
    })
    .catch(err => {
        return dispatch({ type: 'ANSWERS_AQUISITION_FAILED'})
    })
}