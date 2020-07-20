const Report = require('../models/report');

async function create(req, res) {
    const newNote = {
        body: req.body.note,
        date: req.body.date,
    }
    try {
        const report = await Report.findById(req.body.parentReportId);
        report.notes.push(newNote);
        report.save();
        res.status(201).json(report);
    } catch (err) {
        res.status(500).json(err)
    }
}

// async function deleteOne(req, res) {
//     try {
//         const deletedReport = await Report.findByIdAndDelete(req.body._id);
//         res.status(200).json(deletedReport)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

module.exports = {
    create, 
    // deleteOne
}