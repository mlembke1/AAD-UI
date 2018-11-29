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
        // ///////////////////////////////////////////////////////  
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
        /////////////////////////////////////////////////////////////
         let totals = {}
         newAnswersArray.map(answerObject => {
            for (let key in answerObject) {
                if(key.substring(0, 6)  === "answer") {
                    totals[key] ? totals[key].push(answerObject[key]) : totals[key] = [answerObject[key]]
                }
            }
         })

         ////////////////////////////////////////////////////////////
         let totalOccurences = {}
         for (let answerNumber in totals) {
             let individualTotals = {}
             totals[answerNumber].forEach((rating, i) => {
                 individualTotals[rating] ? individualTotals[rating]++ : individualTotals[rating] = 1
                if (!individualTotals["Agree"]) individualTotals["Agree"] = 0
                if (!individualTotals["Disagree"])  individualTotals["Disagree"] = 0
                if (!individualTotals["Indifferent"])  individualTotals["Indifferent"] = 0
                if (!individualTotals["Strongly Agree"]) individualTotals["Strongly Agree"] = 0
                if (!individualTotals["Strongly Disagree"]) individualTotals["Strongly Disagree"] = 0
             })
             totalOccurences[answerNumber] = individualTotals
         }
        
         //////////////////////////////////////////////////////////////////
         console.log(totalOccurences)
      return dispatch({ type:'ANSWERS_AQUIRED', payload: newAnswersArray })
    })
    .catch(err => {
        return dispatch({ type: 'ANSWERS_AQUISITION_FAILED'})
    })
}