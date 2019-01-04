const localStorageLoggedIn = JSON.parse(localStorage.getItem("loggedIn"))
const tokenExpired = () => {
    if (!localStorageLoggedIn) return true
    const toHours = millisec => (millisec / (1000 * 60 * 60)).toFixed(1)
    const currentTimeHours = toHours(new Date().getTime())
    const storedTimeHours = toHours(localStorageLoggedIn.timestamp)
    const transpiredHours = currentTimeHours - storedTimeHours
    return transpiredHours >= 24
}
export const authenticate = () => dispatch => {
    const returnValue = new Promise((resolve, reject) => {
        if(localStorageLoggedIn && !tokenExpired()){
            const username = localStorageLoggedIn.username
                return resolve(dispatch({  type:'SET_LOGGED_IN_USER', username }))
        } else {
            if(localStorageLoggedIn && tokenExpired()) {
                localStorageLoggedIn.removeItem("loggedIn")
            } 
            return reject(dispatch({  type:'SET_LOGGED_IN_USER', username: null }))
        }
    })
   return returnValue
}