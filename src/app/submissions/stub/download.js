/**
 * @name downloadSubmission
 * @param {String} `id` - ID of the submission to be downloaded
 * @returns {Promise<Response>}
 */

export default async function downloadSubmission(id) {
    return fetch(`/api/subs/${String(id)}/source`).then(res => {
        if (res.status !== 200) throw new Error('Error fetching source code : response code is not 200');
        return res.text();
    });
}
