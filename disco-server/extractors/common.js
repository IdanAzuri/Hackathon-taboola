var domain = /:\/\/(.[^/]+)/;

function getDomain(url) {
    return url.match(domain)[1].replace('www.', '')
}

module.exports = {
    getDomain: getDomain
}