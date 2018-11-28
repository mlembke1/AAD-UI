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
        console.log('HERE ARE THE ANSWERS', payload)
      return dispatch({ type:'ANSWERS_AQUIRED', payload })
    })
    .catch(err => {
        return dispatch({ type: 'ANSWERS_AQUISITION_FAILED'})
    })
}