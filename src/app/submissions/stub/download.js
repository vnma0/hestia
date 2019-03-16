/**
 * @name downloadSubmission
 * @param {String} `id` - ID of the submission to be downloaded
 * @returns {Promise<Response>}
 */

import { pushNotification } from '../../notifier/notify.js'

export default async function downloadSubmission(id) {
    return fetch(`/api/subs/${String(id)}/source`)
        .then(res => res.text())
        .catch((err) => {
            if (process.env.NODE_ENV === 'development') {
                console.log(err);
                if (typeof pushNotification === 'function') {
                    pushNotification('Failed retrieving submissions.')
                }
            }
            return '';
        })
}