const Plant = require('../models/plant');
const Report = require('../models/report');

// async function index(req, res) {
//     try {
//         const reports = await report.find({});
//         reports.sort(sortByCommonName)
//         res.status(200).json(reports);
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

async function create(req, res) {
    try {
        const plant = await Plant.findOne({commonName: req.body.noxiousSpecies})
        req.body.noxiousSpecies = plant._id;
        const report = await Report.create(req.body);
        res.status(201).json(report);
    } catch (err) {
        res.status(500).json(err)
    }
}

/* --------- HELPER FUNCTIONS --------- */ 

// function sortByCommonName(reportOne, reportTwo) {
//     if (reportOne.commonName > reportTwo.commonName) return 1;
//     if (reportOne.commonName < reportTwo.commonName) return -1;
//     return 0;
// }

module.exports = {
    // index,
    create, 
}