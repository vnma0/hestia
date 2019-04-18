/**
 * @name verifyLogin
 * @desc Verify user permission if logged in using `/api/users` route of Wafter
 * @returns {Promise<Response>}
 * @author minhducsun2002
 */

async function verifyLogin() {
    return fetch(`/api/users`)
        .then(res => {
            if (!res.ok) throw new Error('Attempt to automatically log in failed');
            return res.text();
        })
        .then(response => ({
            ok: true,
            username: JSON.parse(response)['username'],
            id: JSON.parse(response)['_id']
        }))
        .catch(err => {
            if (process.env.NODE_ENV === 'development')
                // hide all errors on production builds
                console.log(err);
            return {
                ok: false,
                username: 'null',
                id: 'null'
            };
        });
}

export default verifyLogin;
