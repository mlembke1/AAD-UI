export const auth = ( state={ 
  toDash: false, 
  username: null,
  usernameIsTaken: false,
  signupFailed: false
 }, action) => {
    switch(action.type){
      case 'SET_LOGGED_IN_USER':
        return { ...state, username: action.payload }
      case 'SIGNUP_SUCCESS':
        return { ...state, toDash: true }
      case 'USERNAME_IS_TAKEN':
        return { ...state, usernameIsTaken: true }
      case 'USERNAME_IS_FREE':
        return { ...state, usernameIsTaken: false }  
      case 'SIGNUP_FAILED':
        return { ...state, signupFailed: true }  

      default:
        return state
    }
}