export const checkUsername = (username) => dispatch => {
    const options = {
        method: 'POST',
        credentials: 'include',
        crossDomain: true,
        headers:{
            'Content-Type': 'application/json'
        },
        body: { username }
      }
      fetch('http://localhost:3000/checkUsername', options)
      .then(r => r.json())
      .then(json => {
          console.log('USERNAME_IS_TAKEN JSON RESPONSE', json)
          if(json.message === 'TAKEN') {
              return dispatch({ type:'USERNAME_IS_TAKEN' })
          }
      })
      .catch(err => console.log('USERNAME_IS_TAKEN NO WORKY', err))
    
  }