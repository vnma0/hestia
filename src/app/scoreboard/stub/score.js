import { isUndefined } from 'util'

/**
 * @name parseScore
 * @desc `fetch()` scoreboard
 * @param {Function} func - Function to call when window.hestia.contest.scoreboard has been updated
 * @returns {Promise} a `fetch()` `Promise`
 */

async function parseScore(func) {
    return fetch(
        `http://${window.location.hostname}:${window.location.port}/api/score`
    )
        .then(res => {
            if (res.status === 304)
                // no change required; return nothing
                return
            else return res.json()
        })
        .then(responseBody => {
            if (isUndefined(responseBody))
                // responseBody will be `undefined` if
                // 304 status received
                return

            window.hestia.contest.scoreboard = []
            // overwriting data each time we `fetch()`

            responseBody.map(record => ({
                name: record.name,
                result: record.result,
                aced: record.aced,
                score: record.score,
            }))
            window.hestia.contest.scoreboard = responseBody
        })
        .then(() => {
            if (typeof func === 'function') func()
        })
        .catch(() => {
            if (typeof window.hestia.pushNotification === 'function')
                window.hestia.pushNotification('Failed to load scoreboard')
        })
}

export default parseScore
