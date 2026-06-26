const express = require('express')
const router = express.Router()
const Inquiry = require('../models/Inquiry')

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message, propertyId } = req.body

        if (!name || !message || (!email && !phone)) {
            return res.status(400).json({ message: 'Name and message are required' })
        }

        await Inquiry.create({
            name,
            email: email || '',
            phone: phone || '',
            message,
            propertyId: propertyId || ''
        })

        res.status(201).json({ message: 'Message sent successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
