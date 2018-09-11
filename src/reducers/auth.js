export const auth = ( state={ hasCookie: false }, action) => {
    switch(action.type){
      case 'SET_COOKIE_STATE':
        return { ...state, hasCookie: action.payload }

      default:
        return state
    }
}