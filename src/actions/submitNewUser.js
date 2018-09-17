export const submitNewUser = (object) => dispatch => {
    const options = {
        method: 'POST',
        // credentials: 'include',
        crossDomain: true,
        headers:{
            'Content-Type': 'application/json'
        },
        body: object
      }
      fetch('http://localhost:3000/signup', options)
      .then(r => r.json())
      .then(json => {
          console.log('SIGNUP RESPONSE ', json)
          if(json.message === 'Success') {
              return dispatch({ type:'SET_LOGGED_IN_USER', payload: json.payload.username })
          } else {
              return dispatch({ type:'SIGNUP_FAILED' })
          }
      })
      .catch(err => console.log('ERROR WITH SIGNUP REQUEST', err))
    
  }