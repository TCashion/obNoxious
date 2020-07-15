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
    const plant = new Plant(req.body);
    try {
        await Plant.save();
        res.status(201).json(plant);
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    index,
    create
}