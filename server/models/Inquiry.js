const mongoose = require('mongoose')

const inquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    message: { type: String, required: true },
    propertyId: { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.model('Inquiry', inquirySchema)
