export const auth = ( state={ username: null }, action) => {
    switch(action.type){
      case 'SET_LOGGED_IN_USER':
        return { ...state, username: action.payload }

      default:
        return state
    }
}