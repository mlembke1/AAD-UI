export const checkCookie = () => dispatch => {
    if(localStorage.username){
        const username = localStorage.getItem('username')
            return dispatch({  type:'SET_LOGGED_IN_USER', username })
    }
}