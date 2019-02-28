import dayjs from 'dayjs';

export default function timeAgo (date1, date2) {
    let from = dayjs(date1), to = dayjs(date2);
    let parsed = {};
    for (let field of ['year', 'month', 'day', 'hour', 'minute', 'second']) 
        parsed[field] = Math.abs(from.diff(to, field))

    let out = '';
    if (parsed.year) out += `${parsed.year} YEAR`
    if (parsed.month % 12) out += ` ${parsed.month % 12} MONTH`
    if (parsed.day % 30) out += `, ${parsed.day % (30)} DAY`
    out += ` ${padding(parsed.hour % (24))}:${padding(parsed.minute % 60)}:${padding(parsed.second % 60)}`
    return out;
}

function padding (string) {
    return (String(string).length < 2 ? '0' + String(string) : String(string))
}