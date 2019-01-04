export const logout = () => dispatch => {
        if(localStorage.getItem("loggedIn")){
                localStorage.removeItem("loggedIn")
                window.location.reload()
                dispatch({type: 'LOGOUT'})
        } 
}