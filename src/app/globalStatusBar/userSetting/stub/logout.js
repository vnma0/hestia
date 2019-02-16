/**
 * @name logout
 * @desc Log out the current user
 * @param {Function} func - Function to execute after the promise resolves
 * @returns {Promise} a fetch() resolving with whatever `func` returns
 * @author minhducsun2002
 */

async function logout(func) {
    return fetch(
        `http://${window.location.hostname}:${window.location.port}/logout`
    )
        .then(() => {
            window.hestia.user = {}
        })
        .then(func)
}

export default logout
