export const getTools = () => dispatch => {
    fetch('http://localhost:3000/getAllTools')
    .then(r => r.json())
    .then(json => {
      console.log('TOOLS JSON RESPONSE', json)
      const names = json.map(x => x.name)
      const urls = json.map(x => x.url)
      return dispatch({ type:'TOOLS_AQUIRED', payload: { names, urls } })
    })
    .catch(err => {
        return dispatch({ type: 'TOOL_AQUISITION_FAILED'})
    }
  }