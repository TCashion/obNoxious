const Plant = require('../models/plant');
const Report = require('../models/report');
const plant = require('../models/plant');

async function index(req, res) {
    try {
        const reports = await Report.find({})
            .populate('noxiousSpecies')
            .populate('user')
            .exec(function (err, reports) {
                res.status(200).json(reports);
            });
    } catch (err) {
        res.status(500).json(err)
    }
}

async function create(req, res) {
    try {
        const plant = await Plant.findOne({ commonName: req.body.noxiousSpecies })
        req.body.noxiousSpecies = plant;
        const report = await Report.create(req.body);
        Report.populate(report, { path: 'user', model: 'User' }, function (err, report) {
            res.status(201).json(report);
        })
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

async function deleteOne(req, res) {
    try {
        const deletedReport = await Report.findByIdAndDelete(req.body._id);
        res.status(200).json(deletedReport)
    } catch (err) {
        res.status(500).json(err)
    }
}

async function update(req, res) {
    try {
        const updatedReport = await Report.findByIdAndUpdate(
            req.body._id,
            { ...req.body },
            { new: true }
        );
        res.status(200).json(updatedReport)
    } catch (err) {
        res.status(500).json(err);
    }
}

async function getPlantLocations(req, res) {
    try {
        const ObjectId = require('mongoose').Types.ObjectId;
        const plantReports = await Report.find({ 'noxiousSpecies': new ObjectId(req.params.id) });
        const features = [];
        plantReports.forEach((report) => {
            report.featureCollection.features.forEach((feature) => {
                features.push(feature)
            });
        });
        const featureCollection = {
            type: 'FeatureCollection',
            features
        };
        res.status(200).json(featureCollection);
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    index,
    create,
    deleteOne,
    findOne,
    update,
    getPlantLocations
}