const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commonName: String,
    scientificName: String,
    taxonomy: {
        kingdom: {type: String}, 
        phylum: {type: String}, 
        class: {type: String}, 
        order: {type: String}, 
        family: {type: String}, 
        genus: {type: String}, 
    },
    distribution: [String],
    nsxUrl: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Plant', plantSchema);