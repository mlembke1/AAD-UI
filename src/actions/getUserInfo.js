const localStorageLoggedIn = JSON.parse(localStorage.getItem("loggedIn"))
export const getUserInfo = () => dispatch => {
    return new Promise((resolve, reject) => {
        if(localStorageLoggedIn){
            const options = {
                method: 'GET',
                credentials: 'include',
                crossDomain: true,
                headers:{
                    'Content-Type': 'application/json'
                }
            }
            const username = localStorageLoggedIn.username
            fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + `/getUserInfo/${username}`, options)
            .then(r => r.json())
            .then(payload => {
                return resolve(dispatch({ 
                    type:'GET_USER_INFO', 
                    payload: {
                        firstName: payload[0].firstName, 
                        lastName: payload[0].lastName, 
                        jobTitle: payload[0].jobTitle,
                        company: payload[0].company,
                        role: payload[0].role,
                        username: payload[0].username, 
                        user_id: payload[0].id
                    }
                }))
            })
            .catch(err => {
                return reject(dispatch({ type: 'GET_USER_INFO_FAILED'}))
            })
        } else {
            return reject(dispatch({ type: "GET_USER_INFO_FAILED" }))
        }
    })
}