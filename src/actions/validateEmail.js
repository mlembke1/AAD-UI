export const validateEmail = (email) => dispatch => {
    fetch('http://localhost:3000/getAllUsers')
      .then(r => r.json())
      .then(json => {
          const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
          const emails = json.map(x => x.email)
          const emailIsTaken = emails.includes(email.trim()) ? true : false
          if(!emailRegex.test(email)){
              return dispatch({type: 'INVALID_EMAIL'})
          } else {
            if(emailIsTaken){
                return dispatch({type: 'EMAIL_ALREADY_EXISTS'})
            } else {
                return dispatch({type: 'EMAIL_IS_VALID_AND_FREE'})
            }
          }
      })
    }
