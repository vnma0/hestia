/**
 * @name constructRequestBody
 * @description Create an `URLSearchParams` object suitable for sending as credential changing request
 * @param {String} password - Self-explanatory
 * @param {String} newPassword - Self-explanatory
 * @returns {URLSearchParams} - new `URLSearchParams` with given parameters
 */

function constructRequestBody(password, newPassword) {
    let out = new URLSearchParams();
    out.append('password', password);
    out.append('newPassword', newPassword);
    return out;
}

/**
 * @name changePassword
 * @description Change password. Reload the page upon successful response.
 * @param {String} userId - user ID to change password
 * @param {String} password - old password
 * @param {String} newPassword - new password
 * @param {Function} func - Function to call upon operation finishing.
 *                          Signature: `function (success : Boolean)`, with `success` as `Response.ok`.
 * @returns {Promise<Response>}
 */

export default async function passwordChange (userId = window.hestia.user.userId, 
                                                password, newPassword, func) {
    return fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'cors',
        body: constructRequestBody(password, newPassword)
    }).then(res => {
        // console.log(res.text())
        if (res.ok)
        // password successfully changed
            window.location.reload()
            // reload, because the server will sign out automatically
        else throw new Error('Request to change password failed')
    }).then((okay) => {
        if (typeof func === 'function')
            func(okay);
    }).catch(err => {
        if (typeof window.hestia.pushNotification === 'function')
            window.hestia.pushNotification(
                'Failed to change your password'
            )
    })
}
