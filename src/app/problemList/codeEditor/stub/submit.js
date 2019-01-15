/**
 * @name constructData
 * @param {String} code 
 * @param {String} filename 
 * @param {String} ext
 * @author minhducsun2002 
 */

function constructData(code, filename, ext) {
    if (ext === 'c') ext = 'cpp'

    // force inject .c -> .cpp here
    // gotta fix later I guess

    let out = new FormData();
    out.append('code', code, `${filename}.${ext}`);
    return out;
}

/**
 * @name submit
 * @desc Function to submit code using `POST` `fetch()` 
 * @param {String} code - code 
 * @param {String} filename - File name WITHOUT extension
 * @param {String} ext - extension
 * @param {String} func - function to call when `fetch()` completed.
 *                        Will be passed `res.ok` as the only argument
 * @returns {Promise} - a `fetch()` `Promise`
 */

async function submit(code, filename, ext, func) {
    return fetch(`http://${window.location.hostname}:${window.location.port}/subs`, {
        method: "POST",
        body: constructData(code, filename, ext)
    }).then(res => res.ok).then(func)
}

export default submit