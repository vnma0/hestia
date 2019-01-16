/**
 * @name score
 * @desc `fetch()` scoreboard
 * @param {Function} func - Function to call when window.hestia.contest.scoreboard has been updated
 * @returns {Promise} a `fetch()` `Promise`
 */

async function score(func) {
    return fetch(`http://${window.location.hostname}:${window.location.port}/score`)
        .then(res => res.json())
        .then(a => console.dir(a))
}

export default score;