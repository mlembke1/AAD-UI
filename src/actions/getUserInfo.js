export const getUserInfo = () => dispatch => {
    if(localStorage.username){
        const options = {
            method: 'GET',
            credentials: 'include',
            crossDomain: true,
            headers:{
                'Content-Type': 'application/json'
              }
        }
        const username = localStorage.getItem('username')
        fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + `/getUserInfo/${username}`, options)
        .then(r => r.json())
        .then(payload => {
          return dispatch({ 
              type:'GET_USER_INFO', 
              payload: {
                  firstName: payload[0].firstName, 
                  lastName: payload[0].lastName, 
                  jobTitle: payload[0].jobTitle,
                  company: payload[0].company
                }
            })
        })
        .catch(err => {
            return dispatch({ type: 'GET_USER_INFO_FAILED'})
        })
    }
}