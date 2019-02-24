import submissionParse from '../../../submissions/stub/submission.js'

/**
 * @name constructRequestBody
 * @desc Create an URLSearchParam object suitable to be sent as log in request
 * @param {String} username - Username
 * @param {String} password - Password
 * @return {URLSearchParams} `new URLSearchParam()` with given params
 */

function constructRequestBody(username, password) {
    let out = new URLSearchParams()
    out.append('username', username)
    out.append('password', password)
    return out
}

/**
 * @name login
 * @desc Log in function. On completion, window.hestia.loggedIn will have the result of the log in attempt
 * @param {String} username - Username
 * @param {String} password - Password
 * @param {Function} func - Function to call when window.hestia.updateLoginState returned.
 * @return {Promise} - a Promise that resolves to the return value of func()
 * @author minhducsun2002
 */

async function login(username, password, func) {
    return (
        fetch(
            `/api/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: constructRequestBody(username, password),
                mode: 'cors',
            }
        )
            .then(res => {
                window.hestia.user.loggedIn = res.ok
                window.hestia.user.userId = res.json()['_id']
            })
            .then(() => (window.hestia.user.username = username))
            // set username
            .then(() => {
                if (window.hestia.user.loggedIn)
                    submissionParse(
                        window.hestia.user.username,
                        window.hestia.updateSubmission
                    )
                // only update if logged in
            })
            // load submission list
            .then(func)
    )
    // execute callback
}

export default login
