export const logout = () => dispatch => {
        localStorage.removeItem("loggedIn")
        window.location.reload()
        return dispatch({type: 'LOGOUT'})
}