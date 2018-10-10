
const clearCookies = async () => {
        console.log('YOU HAVE ENTERED THE CLEAR COOKIES FUNCTION')
        console.log('--------------------------------------------')
        console.log('--------------------------------------------')
        console.log('WINDOW.DOCUMENT.COOKIE BEFORE', window.document.cookie)
        console.log('WINDOW.DOCUMENT.COOKIE BEFORE LENGTH', (window.document.cookie).length)
        console.log('TYPEOF WINDOW.DOCUMENT.COOKIE BEFORE', typeof window.document.cookie)
        console.log('--------------------------------------------')
        console.log('--------------------------------------------')
        console.log('WINDOW.DOCUMENT BEFORE', window.document)
        console.log('TYPEOF WINDOW.DOCUMENT BEFORE', typeof window.document)
        console.log('--------------------------------------------')
        console.log('--------------------------------------------')
        console.log('WINDOW BEFORE', window)
        console.log('TYPEOF WINDOW BEFORE', typeof window)
        console.log('--------------------------------------------')
        console.log('--------------------------------------------')

        var d = new Date(); //Create an date object
        d.setTime(d.getTime() - (1000*60*60*24)); //Set the time to the past. 1000 milliseonds = 1 second
        var expires = "expires=" + d.toGMTString(); //Compose the expirartion date
        // window.document.cookie = "aad_token"+"="+"; "+expires +` domain=${process.env.REACT_APP_PUBLIC_URL}`;//Set the cookie with name and the expiration date
        document.cookie = "aad_token" + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

        
        console.log('--------------------------------------------')
        console.log('--------------------------------------------')
        console.log('WINDOW.DOCUMENT.COOKIE AFTER', window.document.cookie)
        console.log('WINDOW.DOCUMENT.COOKIE AFTER LENGTH', (window.document.cookie).length)
        console.log('TYPEOF WINDOW.DOCUMENT.COOKIE AFTER', typeof window.document.cookie)
        console.log('--------------------------------------------')
        console.log('--------------------------------------------')
        console.log('WINDOW.DOCUMENT AFTER', window.document)
        console.log('TYPEOF WINDOW.DOCUMENT AFTER', typeof window.document)
        console.log('--------------------------------------------')
        console.log('--------------------------------------------')
        console.log('WINDOW AFTER', window)
        console.log('TYPEOF WINDOW AFTER', typeof window)
        console.log('--------------------------------------------')
        console.log('--------------------------------------------')
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