/**
 * @name publicParse
 * @desc Parse contest public information
 * @param {Function} func - Function to execute after the promise resolves.
 * @author minhducsun2002
 */

async function publicParse(func) {
    return fetch(`http://${window.location.hostname}:${window.location.port}/info`)
        .then(res => res.json())
        .then(responseBody => {
            window.hestia.contest = {
                name : responseBody["name"],
                time : {
                    start : new Date(responseBody["startTime"]),
                    end : new Date(responseBody["endTime"])
                },
                problemList : (responseBody["probList"]),
                acceptedMIME : responseBody["acceptMIME"]
            }
        })
        .then(func)
}

export default publicParse;