/**
 * @name logout
 * @desc Log out the current user
 * @author minhducsun2002
 */

import { pushNotification } from '../../../notifier/notify.js';

async function logout() {
    return fetch(`/api/logout`)
        .then(() => window.location.reload(true))
        .catch(() => {
            if (typeof pushNotification === 'function') pushNotification('Failed to log out');
        });
}

export default logout;
