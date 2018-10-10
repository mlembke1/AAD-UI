
const clearLocalStorage = async () => {
        return localStorage.clear()
}

export const logout = () => dispatch => {
        clearLocalStorage() 
        return dispatch({type: 'LOGOUT'})
}