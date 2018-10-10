export const checkCookie = () => dispatch => {
    if(localStorage.username) {
        return dispatch({ type:'SET_LOGGED_IN_USER', payload: localStorage.username })
    }
    
  }
