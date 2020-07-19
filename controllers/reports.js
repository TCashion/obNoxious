const Plant = require('../models/plant');
const Report = require('../models/report');

async function index(req, res) {
    try {
        const reports = await Report.find({})
        .populate('noxiousSpecies')
        .populate('user')
        .exec(function(err, reports) {
            res.status(200).json(reports);
        });
    } catch (err) {
        res.status(500).json(err)
    }
}

async function create(req, res) {
    try {
        const plant = await Plant.findOne({commonName: req.body.noxiousSpecies})
        req.body.noxiousSpecies = plant;
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
    index,
    create, 
    findOne
}