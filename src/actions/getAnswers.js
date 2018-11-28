export const getAnswers = (tool_name) => dispatch => {
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + `/getAnswers/${tool_name}`)
    .then(r => r.json())
    .then(payload => {
      console.log('here are the answers being brought back', payload)
      return dispatch({ type:'ANSWERS_AQUIRED', payload })
    })
    .catch(err => {
        return dispatch({ type: 'FANSWER_AQUISITION_AILED'})
    })
  }