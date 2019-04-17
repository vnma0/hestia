import React from 'react';
import LocalizedMessage from 'react-l10n';

import { pushNotification } from '../../../notifier/notify.js'

/**
 * @name constructData
 * @param {String} code
 * @param {String} filename
 * @param {String} ext
 * @author minhducsun2002
 */

function constructData(code, filename, ext) {
    // if (ext === 'c') ext = 'cpp'

    // force inject .c -> .cpp here
    // gotta fix later I guess

    let out = new FormData()
    out.append(
        'code',
        new File([code], `${filename}${ext}`),
        `${filename}${ext}`
    )
    return out
}

/**
 * @name submit
 * @desc Function to submit code using `POST` `fetch()`
 * @param {String} code - code
 * @param {String} filename - File name WITHOUT extension
 * @param {String} ext - extension
 * @returns {Promise} - a `fetch()` `Promise`
 */

async function submit(code, filename, ext) {
    return fetch(
        `/api/subs`,
        {
            method: 'POST',
            body: constructData(code, filename, ext),
        }
    )
        .then(res => {
            if (typeof pushNotification === "function")
                pushNotification(
                    (res.ok ? 
                        <LocalizedMessage id="problems.notify.success"/> :
                        <LocalizedMessage id="problems.notify.error.failStat" error={res.statusText} />)
                )
            return res.ok
        })
        .catch(() => {
            if (typeof pushNotification === 'function')
                pushNotification(
                    <LocalizedMessage id="problems.notify.error.failTrans" />
                )
        })
}

export default submit
