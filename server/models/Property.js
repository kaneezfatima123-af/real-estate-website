const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    beds: {
        type: Number,
        default: 0
    },
    baths: {
        type: Number,
        default: 0
    },
    area: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        main: { type: String, default: '' },
        bedroom: { type: String, default: '' },
        bathroom: { type: String, default: '' },
        kitchen: { type: String, default: '' },
        living: { type: String, default: '' },
        lawn: { type: String, default: '' },
    },
     
        isFeatured: {
        type: Boolean,
        default: false
    },


    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Property', propertySchema)