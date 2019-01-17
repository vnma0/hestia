/**
 * @name publicParse
 * @desc Parse contest public information
 * @param {Function} func - Function to execute after the promise resolves.
 * @author minhducsun2002
 */

async function publicParse(func) {
    return fetch(`http://${window.location.hostname}:${window.location.port}/info`)
        .then(res => res.json()).catch(err => {})
        .then(responseBody => {
            window.hestia.contest = {
                name : responseBody["name"],
                time : {
                    start : new Date(responseBody["startTime"]),
                    end : new Date(responseBody["endTime"])
                },
                problemList : (responseBody["probList"]),
                ext: (responseBody["allowedCodeExt"] || [".cpp", ".py", ".java"])
            }
        })
        .then(func)
        .catch(() => {
            if (typeof window.hestia.pushNotification === "function")
                window.hestia.pushNotification("Failed to fetch data")
        })
}

export default publicParse;