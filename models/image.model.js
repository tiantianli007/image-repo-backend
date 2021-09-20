const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    name: {type: String},
    file: {type: String}
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;