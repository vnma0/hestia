import { isNumber } from 'util'
import { pushNotification } from '../../notifier/notify.js'

function constructURL(count, page, size) {
    let out = new URLSearchParams()
    if (isNumber(count)) out.append(`count`, count)
    if (isNumber(page)) out.append(`page`, page)
    if (isNumber(size)) out.append(`size`, size)
    return out.toString() === '' ? '' : `?${out.toString()}`
}

/**
 * @name submissionParse
 * @desc Fetch the submission table
 * @param {Number} count - Number of subs limited in the selected
 * @param {Number} size - Limit the size of each page
 * @param {Number} page - Page number
 * @return {Promise<Response>} a `fetch()` `Promise`
 * @author minhducsun2002
 */

export default async function submissionParse(count, page, size) {
    return fetch(`/api/subs${constructURL(count, page, size)}`)
        .then(res => res.json())
        .then(subsTable => {
            let submissions = []

            for (let sub of subsTable.data) {
                submissions.push({
                    contestant: sub['username'],
                    verdict: (sub['status'] === null) ? "Pending" : sub['status'],
                    timestamp: new Date(sub['date']).toLocaleString(),
                    id: sub['_id'],
                    problem: sub['prob_id'],
                    score: sub['score'],
                    tests: (sub['tests'] ? sub['tests'] : []).map(test => ({
                        executionTime: String(test.time),
                        verdict: test.verdict,
                        mark: test.score,
                    })),
                })
            }

            return {
                submissions: submissions,
                meta: {
                    submissionsListSize: subsTable.count,
                    currentPageId: subsTable.page,
                    pageSize: subsTable.size,
                },
            }
        })
        .catch(() => {
            if (typeof pushNotification === 'function')
                pushNotification(
                    'Failed to fetch submission board'
                )
            return {
                submissions: [],
                meta: {
                    submissionsListSize: 0,
                    currentPageId: 0,
                    pageSize: 10,
                },
            }
        })
}
