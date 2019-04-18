/**
 * @name downloadSubmission
 * @param {String} `id` - ID of the submission to be downloaded
 * @returns {Promise<Response>}
 */
import React from 'react';

import { pushNotification } from '../../notifier/notify.js';
import LocalizedMessage from 'react-l10n';

export default async function downloadSubmission(id) {
    return fetch(`/api/subs/${String(id)}/source`)
        .then(res => {
            if (res.status !== 200) throw new Error('Error fetching source code : response code is not 200');
            return res.text();
        })
        .catch(err => {
            if (process.env.NODE_ENV === 'development') {
                console.log(err);
                if (typeof pushNotification === 'function') {
                    pushNotification(<LocalizedMessage id='submissions.error.source' />);
                }
            }
            return undefined;
        });
}
