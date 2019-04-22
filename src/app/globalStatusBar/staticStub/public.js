import React from 'react';
import LocalizedMessage from 'react-l10n';

import { pushNotification } from '../../notifier/notify.js';

/**
 * @name publicParse
 * @desc Parse contest public information
 * @author minhducsun2002
 */

async function publicParse() {
    return fetch(`/api/info`)
        .then(res => res.json())
        .then(responseBody => ({
            name: String(responseBody['name']),
            time: {
                start: new Date(responseBody['startTime']),
                end: new Date(responseBody['endTime'])
            },
            problems: responseBody['probList'],
            ext: responseBody['allowedCodeExt'] || ['.cpp', '.py', '.java'],
            mode: String(responseBody['mode'])
        }))
        .catch(() => {
            if (typeof pushNotification === 'function')
                pushNotification(<LocalizedMessage id='globalStatusBar.staticLoader.failed' />);
            return {
                name: '',
                time: {
                    start: new Date(),
                    end: new Date()
                },
                problems: [],
                ext: ['null'],
                mode: 'OI'
            };
        });
}

export default publicParse;
