export const auth = ( state={ username: null, usernameIsTaken: false }, action) => {
    switch(action.type){
      case 'SET_LOGGED_IN_USER':
        return { ...state, username: action.payload }
      case 'USERNAME_IS_TAKEN':
        return { ...state, usernameIsTaken: true }

      default:
        return state
    }
}