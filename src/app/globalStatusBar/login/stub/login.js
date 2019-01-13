/**
 * @name login
 * @desc Log in function. On completion, window.hestia.loggedIn will have the result of the log in attempt
 * @param {String} username - Username
 * @param {String} password - Password
 * @param {Function} func - Function to call when window.hestia.updateLoginState returned.
 * @return {Promise} - a Promise that resolves to the return value of func()
 * @author minhducsun2002
 */

async function login (username, password, func) {
    return fetch(`http://${window.location.hostname}:${window.location.port}/login`, {
        method : "POST",
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin' : `http://${window.location.hostname}:${window.location.port}`
        },
        body : new URLSearchParams(`username=${username}&password=${password}`),
        mode : 'cors'
        })
        .then(res => {
            window.hestia.user.loggedIn = res.ok;
            return res.text()
        })
        // trigger React forceUpdate()
        .then(window.hestia.user.username = username)
        // set username
        .then(func);
        // execute callback
}

export default login;