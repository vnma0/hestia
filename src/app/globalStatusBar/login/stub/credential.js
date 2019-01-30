import submissionParse from '../../../submissions/stub/submission.js';

/**
 * @name verifyLogin
 * @desc Verify user permission if logged in using `/users` route of Wafter
 * @param {Function} func - Function to execute after the promise resolves.
 * @return {Promise} a fetch() that resolves to the return value of func()
 * @author minhducsun2002
 */

async function verifyLogin(func) {
    return fetch(`http://${window.location.hostname}:${window.location.port}/api/users`)
        .then(res => {
            window.hestia.user.loggedIn = (res.status !== 401);
            return res.text();
        })
        .then(responseBody => {
            // if logging in failed, JSON.parse would fail
            // and I don't know how to handle rejection
            try {
                if (window.hestia.user.loggedIn) {
                    window.hestia.user.username = JSON.parse(responseBody)["username"];
                    window.hestia.user.userId = JSON.parse(responseBody)["_id"];
                    submissionParse(window.hestia.user.username, () => {
                        if (typeof window.hestia.updateSubmission === "function")
                            window.hestia.updateSubmission();
                    })
                }
            }
            catch (err) {
                console.log(err);
            }
        })
        .then(func);
}

export default verifyLogin;