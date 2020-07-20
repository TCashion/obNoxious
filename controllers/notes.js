const Report = require('../models/report');

async function create(req, res) {
    const newNote = {
        body: req.body.note,
        date: req.body.date,
    }
    try {
        const report = await Report.findById(req.body.parentReportId)
            .populate('noxiousSpecies')
            .populate('user')
            .exec(function (err, report) {
                report.notes.push(newNote);
                report.save();
                res.status(201).json(report);
            })
    } catch (err) {
        res.status(500).json(err)
    }
}

async function deleteOne(req, res) {
    try {
        const parentReport = await Report.findById(req.body.reportId)
            .populate('noxiousSpecies')
            .populate('user')
            .exec(function(err, parentReport) {
                parentReport.notes.pull(req.body._id);
                parentReport.save(function (err) {
                    res.status(200).json(parentReport);
                });
            })
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    create,
    deleteOne
}