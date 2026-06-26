const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB Connected')
})
.catch((err) => {
    console.log(err)
})

app.get('/', (req, res) => {
    res.send('Real Estate API chal raha hai')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server chal raha hai port 5000 pe')
})

module.exports = app