/**
 * @name logout
 * @desc Log out the current user
 * @param {Function} func - Function to execute after the promise resolves
 * @returns {Promise} a fetch() resolving with whatever `func` returns
 * @author minhducsun2002
 */

async function logout(func) {
    return fetch(
        `/api/logout`
    )
        .then(() => {
            window.hestia.user = {}
        })
        .then(func)
        .catch(() => {
            if (typeof window.hestia.pushNotification === 'function')
                window.hestia.pushNotification('Failed to log out')
        })
}

export default logout
