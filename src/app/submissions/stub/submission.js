/**
 * @name submissionParse
 * @desc Fetch the submission table
 * @param {Function} func - Function to execute after fetching & mapping done
 * @return {Promise} a `fetch()` `Promise`
 * @author minhducsun2002
 */

async function submissionParse(func) {
    return fetch(
        `/api/subs`
    )
        .then(res => res.json())
        .then(subsTable => {
            // reprocess each time instead of appending old array
            window.hestia.submissions = []

            if (!('problem' in window.hestia)) window.hestia.problem = {}

            for (let sub of subsTable.data) {
                // console.log(sub)
                window.hestia.submissions.push({
                    contestant: sub['username'],
                    verdict: sub['status'],
                    timestamp: new Date(sub['date']).toLocaleString(),
                    id: sub['_id'],
                    problem:
                        window.hestia.problem[sub['prob_id']] || sub['prob_id'],
                    score: sub['score'],
                    tests: (sub['tests'] ? sub['tests'] : []).map(test => {
                        return {
                            executionTime: String(test.time) + ' s',
                            verdict: test.verdict,
                            mark: test.score,
                        }
                    }),
                })
            }
        })
        .then(() => {
            if (typeof func === 'function') func()
        })
        .catch(() => {
            if (typeof window.hestia.pushNotification === 'function')
                window.hestia.pushNotification(
                    'Failed to fetch submission board'
                )
        })
}

export default submissionParse
