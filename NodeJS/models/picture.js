const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema({
    title:{
        type: String,
    },
    explanation:{
        type: String,
    },
    url:{
        type: String,
    },
    date:{
        type: String,
    },
    media_type:{
        type: String,
    }
})

module.exports = mongoose.model('Picture', pictureSchema);