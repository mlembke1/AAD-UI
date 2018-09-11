export const checkCookie = (cookies) => dispatch => {
    const payload = cookies.split(';').map(x => x.trim()).filter(x => x.substring(0, 3) == 'aad').length > 0
    return dispatch({ type:'SET_COOKIE_STATE', payload })
  }