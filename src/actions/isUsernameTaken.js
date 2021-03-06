export const isUsernameTaken = (username) => dispatch => {
  fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/getAllUsers')
  .then(r => r.json())
  .then(json => {
    const usernames = json.map(x => x.username)
    const userNameIsTaken = usernames.includes(username) ? true : false
    if(userNameIsTaken) {
      return dispatch({ type:'USERNAME_IS_TAKEN' })
    } else {
      return dispatch({ type:'USERNAME_IS_FREE' })
    }
  })
  .catch(err => err)   
}
