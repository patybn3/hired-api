const mongoose = require('mongoose')

// const Contact = require('./contact')
// const contactSchema = Contact.schema

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  // contact: [ contactSchema ],

}, {
  timestamps: true
})

module.exports = mongoose.model('Profile', profileSchema)
