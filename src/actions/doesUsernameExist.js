export const doesUsernameExist = (username) => dispatch => {
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/getAllUsers')
    .then(r => r.json())
    .then(json => {
        console.log('DOES USERNAME EXIST JSON RESPONSE', json)
        const usernames = json.map(x => x.username)
        const usernameExists = usernames.includes(username) ? true : false
        if(usernameExists) {
          return dispatch({ type:'USERNAME_EXISTS' })
        } else {
          return dispatch({ type:'USERNAME_DOES_NOT_EXIST' })
        }
    })
    .catch(err => console.log('DOES USERNAME EXIST NO WORKY', err))
  
}
