const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    noxiousSpecies: Schema.Types.ObjectId,
    location: {
        lat: {
            type: Number,
            default: 40
        },
        long: {
            type: Number,
            default: -105
        }
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