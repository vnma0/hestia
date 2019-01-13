/**
 * @name submissionParse
 * @desc Fetch the submission table
 * @param {Function} func - Function to execute after fetching & mapping done
 * @return {Promise} a `fetch()` `Promise`
 * @author minhducsun2002
 */

async function submissionParse(func) {
    return fetch(`http://${window.location.hostname}:${window.location.port}/subs`)
        .then(res => res.json())
        .then(subsTable => {
            if (!("submissions" in window.hestia))
                window.hestia.submissions = [];
            if (!("problem" in window.hestia))
                window.hestia.problem = {};

            for (let sub of subsTable) {
                console.log(sub)
                window.hestia.submissions.push({
                    contestant : window.hestia.user.username,
                    verdict: sub["status"],
                    timestamp: new Date(sub["date"]).toLocaleString(),
                    id: sub["_id"],
                    problem:  window.hestia.problem[sub["prob_id"]] || sub["prob_id"],
                    score: sub["score"],
                    tests : (sub["tests"] ? sub["tests"] : []).map(test => {
                        return {
                            executionTime: String(test.time) + ' s',
                            verdict: test.verdict,
                            mark : test.score,
                        }
                    })
                })
            };
        })
        .then(func)
}

export default submissionParse;

