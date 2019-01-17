/**
 * @name parseScore
 * @desc `fetch()` scoreboard
 * @param {Function} func - Function to call when window.hestia.contest.scoreboard has been updated
 * @returns {Promise} a `fetch()` `Promise`
 */

async function parseScore(func) {
    return fetch(`http://${window.location.hostname}:${window.location.port}/score`)
        .then(res => res.json()).catch(err => window.hestia)
        .then(a => {
            console.log(a);
            return a;
        })
        .then(responseBody => {
            if (!("scoreboard" in window.hestia.contest))
                window.hestia.contest.scoreboard = [];
            responseBody.map(record => {
                window.hestia.contest.scoreboard.push({
                    name: record.name,
                    result: record.result,
                    aced: record.aced,
                    score: record.score
                })
            })
        }).then(() => {
            if (typeof func === "function")
                func();
        })
        .catch(() => {
            if (typeof window.hestia.pushNotification === "function")
                window.hestia.pushNotification("Failed to fetch data")
        })
}

export default parseScore;