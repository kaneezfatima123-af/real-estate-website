const express = require('express')
const router = express.Router()
const Property = require('../models/Property')
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Not authorized' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

const getUserId = (req) => req.user.id || req.user._id

router.post('/add', verifyToken, async (req, res) => {
  try {
    const { title, price, location, beds, baths, area, type, description, images, isFeatured } = req.body

    const property = await Property.create({
      title,
      price,
      location,
      beds: parseInt(beds) || 0,
      baths: parseInt(baths) || 0,
      area,
      type,
      description,
      images,
      isFeatured: isFeatured === true || isFeatured === 'true',
      user: getUserId(req)
    })

    res.status(201).json(property)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: error.message })
  }
})

router.get('/my', verifyToken, async (req, res) => {
  try {
    const properties = await Property.find({ user: getUserId(req) }).sort({ createdAt: -1 })
    res.json(properties)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/', async (req, res) => {
  const properties = await Property.find().sort({ createdAt: -1 })
  res.json(properties)
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
    if (!property) return res.status(404).json({ message: 'Property not found' })

    if (property.user.toString() !== getUserId(req).toString()) {
      return res.status(403).json({ message: 'You can only delete your own property' })
    }

    await Property.findByIdAndDelete(req.params.id)
    res.json({ message: 'Property deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  const property = await Property.findById(req.params.id)
  if (!property) return res.status(404).json({ message: 'Not found' })
  res.json(property)
})

module.exports = router
