const Report = require('../models/report');

async function create(req, res) {
    const newFeature = {
        type: req.body.type,
        geometry: req.body.geometry
    };
    try {
        const report = await Report.findById(req.body.parentReportId)
            .populate('noxiousSpecies')
            .populate('user')
            .exec(function (err, report) {
                report.featureCollection.features.push(newFeature);
                report.save();
                res.status(201).json(report);
            })
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    create
}