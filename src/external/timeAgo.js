import dayjs from 'dayjs';

/**
 * @name timeAgo
 * @description return a `String` representing time delta between `date1` and `date2`
 * @param {Date} `date1`
 * @param {Date} `date2`
 * @returns {String}
 */

export default function timeAgo(date1, date2) {
    let from = dayjs(date1),
        to = dayjs(date2);
    let parsed = {};
    for (let field of ['year', 'month', 'day', 'hour', 'minute', 'second']) parsed[field] = to.diff(from, field);

    let out = '';
    if (parsed.day) out += `${parsed.day}:`;
    out += `${padding(parsed.hour % 24)}:${padding(parsed.minute % 60)}:${padding(parsed.second % 60)}`;
    return out;
}

function padding(string) {
    return String(string).padStart(3 - String(string).length, '0');
}
