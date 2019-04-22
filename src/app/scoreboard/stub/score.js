/**
 * @name parseScore
 * @desc `fetch()` scoreboard
 * @returns {Promise<Response>} a `fetch()` `Promise`
 */

async function parseScore() {
    return fetch(`/api/score`)
        .then(res => res.json())
        .then(responseBody => {
            return responseBody.map(record => ({
                name: record.name,
                result: record.result,
                aced: record.aced,
                score: record.score
            }));
        });
}

export default parseScore;
