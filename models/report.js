const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const featureSchema = new mongoose.Schema({
    type: {
        type: String, 
        default: 'Feature'
    },
    geometry: {
        geometryType: {
            type: String, 
            default: 'Point',
        },
        coordinates: [Number]
    }, 
    properties: Object
}, {
    timestamps: true
})

const noteSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        default: function() {
            return new Date();
        },
        required: true
    },
}, {
    timestamps: true
});

const reportSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    noxiousSpecies: {
        type: Schema.Types.ObjectId,
        ref: 'Plant'
    },
    featureCollection: {
        type: {
            type: String, 
            default: 'FeatureCollection'
        },
        features: [featureSchema]
    },
    date: {
        type: Date,
        default: function() {
            return new Date();
        },
    },
    notes: [noteSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);