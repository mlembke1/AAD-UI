
const clearCookies = async () => {
        console.log('YOU HAVE ENTERED THE CLEAR COOKIES FUNCTION')
        console.log('WINDOW.DOCUMENT.COOKIE BEFORE', window.document.cookie)
        var d = new Date(); //Create an date object
        d.setTime(d.getTime() - (1000*60*60*24)); //Set the time to the past. 1000 milliseonds = 1 second
        var expires = "expires=" + d.toGMTString(); //Compose the expirartion date
        // window.document.cookie = "aad_token"+"="+"; "+expires +` domain=${process.env.REACT_APP_PUBLIC_URL}`;//Set the cookie with name and the expiration date
        document.cookie = "aad_token" + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

        console.log('WINDOW.DOCUMENT.COOKIE AFTER', window.document.cookie)
}

const clearLocalStorage = async () => {
        return localStorage.clear()
}

const clearEverything = async () => {
        await clearCookies()
        await clearLocalStorage()
}

export const logout = () => dispatch => {
        clearEverything() 
        return dispatch({type: 'LOGOUT'})
}