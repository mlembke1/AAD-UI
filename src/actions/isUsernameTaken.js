export const isUsernameTaken = (username) => dispatch => {
  fetch((process.env.API_URL || 'http://localhost:3000') + '/getAllUsers')
  .then(r => r.json())
  .then(json => {
    console.log('USERNAME_IS_TAKEN JSON RESPONSE', json)
    const usernames = json.map(x => x.username)
    const userNameIsTaken = usernames.includes(username) ? true : false
    if(userNameIsTaken) {
      return dispatch({ type:'USERNAME_IS_TAKEN' })
    } else {
      return dispatch({ type:'USERNAME_IS_FREE' })
    }
  })
  .catch(err => console.log('USERNAME_IS_TAKEN NO WORKY', err))    
}
