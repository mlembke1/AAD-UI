export const setPermissions = role => dispatch => {
        fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000') + `/getPermissions/${role}`)
        .then(r => r.json())
        .then(permissions => {
          return dispatch({ 
              type:'SET_PERMISSIONS', 
              payload: permissions
            })
        return
        })
        .catch(err => {
            return dispatch({ type: 'SET_PERMISSIONS_FAILED'})
        })
}