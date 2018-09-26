export const auth = ( state={ 
  toDash: false, 
  username: null,
  signupFailed: false,
  loginFailed: false,
  usernameIsTaken: false,// Assume the username is not taken for SIGNUP and not display the error message right away
  usernameExists: true, // Assume the username does exist for LOGIN and not display the error message right away
  emailIsTaken: false,// Assume the email is not taken for SIGNUP and not display the error message right away
  emailExists: true, // Assume the email does exist for LOGIN and not display the error message right away
  invalidEmail: false, // Assume the email they are typing is valid until proven otherwise
  tools: null
 }, action) => {
    switch(action.type){
      case 'RESET_STATE':
        return { toDash: false, 
          username: null,
          signupFailed: false,
          loginFailed: false,
          usernameIsTaken: false,
          usernameExists: true, 
          emailIsTaken: false,
          emailExists: true, 
          invalidEmail: false, 
          tools: null }
      case 'SET_LOGGED_IN_USER':
        return { ...state, username: action.payload }
      case 'SIGNUP_SUCCESS':
        return { ...state, toDash: true }
      case 'SIGNUP_FAILED':
          return { ...state, signupFailed: true }
      case 'LOGIN_SUCCESS':
        return { ...state, toDash: true }
      case 'LOGIN_FAILED':
          return { ...state, loginFailed: true, toDash: false }    
      // USED FOR SIGNUP 
      case 'USERNAME_IS_TAKEN':
        return { ...state, usernameIsTaken: true }
      // USED FOR SIGNUP  
      case 'USERNAME_IS_FREE':
        return { ...state, usernameIsTaken: false }  
      // USED FOR LOGIN 
      case 'USERNAME_DOES_NOT_EXIST':
        return { ...state, usernameExists: false }  
      // USED FOR LOGIN 
      case 'USERNAME_EXISTS':
        return { ...state, usernameExists: true }  
      case 'INVALID_EMAIL':
        return { ...state, invalidEmail: true }  
      // USED FOR SIGNUP & LOGIN
      case 'EMAIL_ALREADY_EXISTS':
        return { ...state, emailIsTaken: true, emailExists: true, invalidEmail: false }  
      // USED FOR SIGNUP & LOGIN
      case 'EMAIL_IS_VALID_AND_FREE':
        return { ...state, emailIsTaken: false, emailExists: false, invalidEmail: false }  
      case 'LOGOUT':
        return { toDash: false, 
          username: null,
          signupFailed: false,
          loginFailed: false,
          usernameIsTaken: false,
          usernameExists: true, 
          emailIsTaken: false,
          emailExists: true, 
          invalidEmail: false, 
          tools: null }  
      case 'TOOLS_AQUIRED':
        return { ...state, tools: action.payload }  

      default:
        return state
    }
}