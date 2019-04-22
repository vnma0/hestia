/**
 * @name logout
 * @desc Log out the current user
 * @author minhducsun2002
 */

async function logout() {
    return fetch(`/api/logout`).then(() => window.location.reload(true));
}

export default logout;
