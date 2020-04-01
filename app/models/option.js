const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Contact', contactSchema)
