var timeparts = [
    // { name: 'mil', div: 31556736000, p: 'a', s: 'um' },
    // { name: 'cent', div: 3155673600, p: 'ies', s: 'y' },
    // { name: 'dec', div: 315567360 },
    // { name: 'yr', div: 31556736 },
    // { name: 'mo', div: 2629728 },
    { name: 'd', div: 86400 },
    { name: 'h', div: 3600 },
    { name: 'm', div: 60 },
    { name: 's', div: 1 },
]

function timeAgo(comparisonDate1, comparisonDate2) {
    var i = 0,
        parts = [],
        interval = Math.floor(
            (comparisonDate2.getTime() - comparisonDate1.getTime()) / 1000
        )
    for (; interval > 0; i += 1) {
        let value = Math.floor(interval / timeparts[i].div)
        interval = interval - value * timeparts[i].div
        if (value) {
            parts.push(
                (value >= 10 ? value : '0' + String(value)) +
                    '' +
                    // timeparts[i].name +
                    (value !== 1 ? timeparts[i].p || '' : timeparts[i].s || '')
            )
        }
    }
    if (parts.length === 0) {
        return '00:00:00'
    }
    while (parts.length < 4)
        parts.push('00');
    return parts.join(':')
}

export default timeAgo

//  https://stackoverflow.com/questions/11479170/javascript-fuzzy-time-e-g-10-minutes-ago-thats-in-exact-seconds
