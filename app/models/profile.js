const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  profileUrl: {
    type: String,
    required: true
  },
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
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contact: {
    type: String,
    require: true
  },
  skills: {
    type: String,
    require: true
  },
  website: {
    type: String
  },
  portfolio: {
    type: String
  },
  other: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Profile', profileSchema)
