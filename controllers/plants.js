const Plant = require('../models/plant');

async function index(req, res) {
    try {
        const plants = await Plant.find({});
        res.status(200).json(plants);
    } catch (err) {
        res.status(500).json(err)
    }
}

async function create(req, res) {
    console.log('reaches create')
    try {
        const plant = await Plant.create(req.body);
        console.log('plant created')
        res.status(201).json(plant);
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    index,
    create
}