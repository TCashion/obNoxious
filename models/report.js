const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new mongoose.Schema({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    }
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
    locations: [locationSchema],
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