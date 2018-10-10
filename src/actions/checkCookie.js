export const checkCookie = () => dispatch => {
    // const options = {
    //     method: 'GET',
    //     credentials: 'include',
    //     crossDomain: true,
    //     headers:{
    //         'Content-Type': 'application/json'
    //       }
    //   }
    //   fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/checkCookie', options)
    //   .then(r => r.json())
    //   .then(json => {
    //       console.log('CHECK COOKIE RESPONSE', json)
    //       if(json.message === 'Success') {
    //           return dispatch({ type:'SET_LOGGED_IN_USER', payload: json.payload.username })
    //       }
    //   })
    //   .catch(err => console.log('COOKIE NO WORKY', err))
    if(localStorage.username) {
        return dispatch({ type:'SET_LOGGED_IN_USER', payload: localStorage.username })
    }
    
  }
