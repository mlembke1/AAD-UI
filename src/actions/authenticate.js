export const authenticate = () => dispatch => {
    const returnValue = new Promise((resolve, reject) => {
        if(localStorage.username){
            const username = localStorage.getItem('username')
                return resolve(dispatch({  type:'SET_LOGGED_IN_USER', username }))
        } else {
                return reject(dispatch({  type:'SET_LOGGED_IN_USER', username: null }))
        }
    })
   return returnValue
}