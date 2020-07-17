const Plant = require('../models/plant');

async function index(req, res) {
    try {
        const plants = await Plant.find({});
        plants.sort(sortByCommonName)
        res.status(200).json(plants);
    } catch (err) {
        res.status(500).json(err)
    }
}

async function create(req, res) {
    try {
        const plant = await Plant.create(req.body);
        res.status(201).json(plant);
    } catch (err) {
        res.status(500).json(err)
    }
}

async function lookupOne(req, res) {
    console.log('lookup: ', req.body)
}

/* --------- HELPER FUNCTIONS --------- */ 

function sortByCommonName(plantOne, plantTwo) {
    if (plantOne.commonName > plantTwo.commonName) return 1;
    if (plantOne.commonName < plantTwo.commonName) return -1;
    return 0;
}

module.exports = {
    index,
    create, 
    lookupOne
}