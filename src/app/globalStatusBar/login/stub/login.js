/**
 * @name constructRequestBody
 * @desc Create an URLSearchParam object suitable to be sent as log in request
 * @param {String} username - Username
 * @param {String} password - Password
 * @return {URLSearchParams} `new URLSearchParam()` with given params
 */

function constructRequestBody(username, password) {
    let out = new URLSearchParams();
    out.append('username', username);
    out.append('password', password);
    return out;
}

/**
 * @name login
 * @desc Log in function. On completion, the page will get reloaded if successful
 * @param {String} username - Username
 * @param {String} password - Password
 * @param {Function} func - Function to call when the global object has been populated with usable value
 * @return {Promise} - a Promise that resolves to the return value of func()
 * @author minhducsun2002
 */

async function login(username, password) {
    return fetch(`/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: constructRequestBody(username, password),
        mode: 'cors'
    })
        .then(res => res.ok)
        .catch(err => {
            if (process.env.NODE_ENV === 'development') console.log(err);
            return false;
        });
}

export default login;
