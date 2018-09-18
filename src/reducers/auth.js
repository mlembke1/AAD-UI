export const auth = ( state={ 
  toDash: false, 
  username: null,
  usernameIsTaken: false,
  signupFailed: false,
  loginFailed: false,
  usernameExists: true
 }, action) => {
    switch(action.type){
      case 'SET_LOGGED_IN_USER':
        return { ...state, username: action.payload }
      case 'SIGNUP_SUCCESS':
        return { ...state, toDash: true }
      case 'SIGNUP_FAILED':
          return { ...state, signupFailed: true }
      case 'LOGIN_SUCCESS':
        return { ...state, toDash: true }
      case 'LOGIN_FAILED':
          return { ...state, loginFailed: true }    
      case 'USERNAME_IS_TAKEN':
        return { ...state, usernameIsTaken: true }
      case 'USERNAME_IS_FREE':
        return { ...state, usernameIsTaken: false }  
      case 'USERNAME_DOES_NOT_EXIST':
        return { ...state, usernameExists: false }  
      case 'USERNAME_EXISTS':
        return { ...state, usernameExists: true }  

      default:
        return state
    }
}