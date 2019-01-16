async function score() {
    return fetch(`http://${window.location.hostname}:${window.location.port}/score`)
        .then(res => res.json())
        .then()
}