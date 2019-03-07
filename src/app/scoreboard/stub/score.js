/**
 * @name parseScore
 * @desc `fetch()` scoreboard
 * @param {Function} func - Function to call when window.hestia.contest.scoreboard has been updated
 * @returns {Promise} a `fetch()` `Promise`
 */

async function parseScore(func) {
    return fetch(
        `/api/score`
    )
        .then(res => res.json())
        .then(responseBody => {
            return responseBody.map(record => ({
                name: record.name,
                result: record.result,
                aced: record.aced,
                score: record.score,
            }))
        })
        .catch((err) => {
            if (typeof window.hestia.pushNotification === 'function')
                window.hestia.pushNotification('Failed to load scoreboard')
            if (process.env.NODE_ENV === 'development')
                console.log(err)
            return []
        })
}

export default parseScore
