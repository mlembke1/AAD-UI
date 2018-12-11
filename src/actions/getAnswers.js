export const getAnswers = (selected_tool_name, questionSet) => dispatch => {
    if (selected_tool_name == "MEADE/SORT-OE")  {const options = {
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
                key === "review_id" || key === "tool_name" || key === "int_type") {
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
                    if(totals[answerObject.int_type]){
                        totals[answerObject.int_type][key] ? totals[answerObject.int_type][key].push(answerObject[key]) : totals[answerObject.int_type][key] = [answerObject[key]]
                    } else {
                        totals[answerObject.int_type] = {
                           [key]: [answerObject[key]]
                        }
                    }
                } 
            }
         })
         
         console.log(totals)
         ////////////////////////////////////////////////////////////
        //  let totalOccurences = {}
        //  let index = 0
        //  for (let intType in totals) {
        //      for (let answerNumber in totals[intType]) {
        //         // console.log('HERE IS INT TYPE', intType)
        //         // console.log('HERE IS ANSWER NUMBER', answerNumber)
        //         // console.log('HERE IS INT TYPE[ANSWERNUMBER]', totals[intType][answerNumber]) 
        //         // console.log('HERE IS TOTALS INT TYPE', totals[intType])
        //         let individualTotals = {}
        //         let sum = totals[intType][answerNumber].length
        //         totals[intType][answerNumber].forEach((rating, i) => {
        //             if (individualTotals[rating]) {
        //                 individualTotals[rating] = ((individualTotals[rating] / 100) * sum)
        //                 individualTotals[rating]++
        //             } else {
        //                 individualTotals[rating] = 1
        //             }
        //             if (!individualTotals["Agree"]) individualTotals["Agree"] = 0
        //             if (!individualTotals["Disagree"])  individualTotals["Disagree"] = 0
        //             if (!individualTotals["Indifferent"])  individualTotals["Indifferent"] = 0
        //             if (!individualTotals["Strongly Agree"]) individualTotals["Strongly Agree"] = 0
        //             if (!individualTotals["Strongly Disagree"]) individualTotals["Strongly Disagree"] = 0
        //             // if (!individualTotals['question']) individualTotals['question'] = questionSet[index].question
        //             // if (!individualTotals['questionID']) individualTotals['questionID'] = questionSet[index].questionID
        //             individualTotals[rating] = ((individualTotals[rating] / sum) * 100)
        //         })
        //         totalOccurences[intType] = individualTotals
        //         index++
        //         console.log('INDIVIDUAL TOTALS', individualTotals)
        //      }
        //  }
        //  console.log(totalOccurences)
         //////////////////////////////////////////////////////////////////
      return dispatch({ type:'ANSWERS_AQUIRED', payload: totals })
    })
    .catch(err => {
        return dispatch({ type: 'ANSWERS_AQUISITION_FAILED'})
    })}
}