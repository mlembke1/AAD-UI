export const getAllTools = () => dispatch => {
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/getAllTools')
    .then(r => r.json())
    .then(payload => {
      console.log('TOOLS JSON RESPONSE', payload)
      return dispatch({ type:'TOOLS_AQUIRED', payload })
    })
    .catch(err => {
        return dispatch({ type: 'TOOL_AQUISITION_FAILED'})
    })
  }