import { isNumber } from 'util'
import { pushNotification } from '../../notifier/notify.js'
import { name } from '../../../lib/libExtHIName.js'

/**
 * @name submissionParse
 * @desc Fetch the submission table
 * @param {Function} func - Function to execute after fetching & mapping done
 * @param {Number} count - Number of subs limited in the selected
 * @param {Number} size - Limit the size of each page
 * @param {Number} page - Page number
 * @return {Promise} a `fetch()` `Promise`
 * @author minhducsun2002
 */

function constructURL(count, page, size) {
    let out = new URLSearchParams()
    if (isNumber(count)) out.append(`count`, count)
    if (isNumber(page)) out.append(`page`, page)
    if (isNumber(size)) out.append(`size`, size)
    return out.toString() === '' ? '' : `?${out.toString()}`
}

export default async function submissionParse(count, page, size) {
    return fetch(`/api/subs${constructURL(count, page, size)}`)
        .then(res => res.json())
        .then(subsTable => {
            let submissions = []

            for (let sub of subsTable.data) {
                submissions.push({
                    contestant: sub['username'],
                    verdict: sub['status'],
                    language: name[String(sub['ext']).toLowerCase().replace('.', '')],
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
