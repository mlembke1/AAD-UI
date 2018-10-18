export const logout = () => dispatch => {
        localStorage.clear()
        return dispatch({type: 'LOGOUT'})
}