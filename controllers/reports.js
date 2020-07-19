const Plant = require('../models/plant');
const Report = require('../models/report');

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

async function findOne(req, res) {
    try {
        const report = await Report.findById(req.params.id);
        res.status(201).json(report)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {

    create, 
    findOne
}