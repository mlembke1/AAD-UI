
export const logout = () => dispatch => {
        var d = new Date(); //Create an date object
        d.setTime(d.getTime() - (1000*60*60*24)); //Set the time to the past. 1000 milliseonds = 1 second
        var expires = "expires=" + d.toGMTString(); //Compose the expirartion date
        window.document.cookie = "aad_token"+"="+"; "+expires;//Set the cookie with name and the expiration date
        localStorage.clear()
        return dispatch({type: 'LOGOUT'})
}