function retreiveMapBoxAccessToken(req, res) {
    const mapBoxToken = process.env.MAPBOX_TOKEN;
    return res.status(200).json(mapBoxToken)
}

module.exports = {
    retreiveMapBoxAccessToken
}