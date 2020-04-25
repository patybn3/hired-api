// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
// pull in Mongoose model for examples
const Profile = require('../models/profile')

const multer = require('multer')

const upload = multer({ dest: 'pictures/' })
// pull in Mongoose model for examples
// const User = require('../models/upload')

const s3Upload = require('./../../lib/s3Upload')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX SIGNED IN, OWNED
// GET /events/owned
router.get('/profiles-owned', requireToken, (req, res, next) => {
  Profile.find({ owner: req.user._id })
    .then(profiles => {
      // `events` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return profiles.map(profile => profile.toObject())
    })
    // respond with status 200 and JSON of the events
    .then(profiles => res.status(200).json({ profiles: profiles }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// INDEX SIGNED OUT
// GET /events/
// router.get('/profiles/openall', (req, res, next) => {
//   Profile.find()
//     .then(profiles => {
//       // `events` will be an array of Mongoose documents
//       // we want to convert each one to a POJO, so we use `.map` to
//       // apply `.toObject` to each one
//       return profiles.map(profile => profile.toObject())
//     })
//     // respond with status 200 and JSON of the events
//     .then(profiles => res.status(200).json({ profiles: profiles }))
//     // if an error occurs, pass it to the handler
//     .catch(next)
// })

// INDEX SIGNED IN
// GET /events
router.get('/profiles', requireToken, (req, res, next) => {
  Profile.find()
    .then(profiles => {
      // `events` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return profiles.map(profile => profile.toObject())
    })
    // respond with status 200 and JSON of the events
    .then(profiles => res.status(200).json({ profiles: profiles }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/profiles/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Profile.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(profile => res.status(200).json({ profile: profile.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

router.get('/profiles-owned/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Profile.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(profile => res.status(200).json({ profile: profile.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /examples
router.post('/profiles', [upload.single('file'), requireToken], (req, res, next) => {
  // set owner of new example to be current user
  // req.body.profile.owner = req.user.id
  console.log(req.file)
  const path = req.file.path
  const mimetype = req.file.mimetype
  console.log(path)
  // req.body.profile
  s3Upload(path, mimetype)
    .then((data) => {
      const profileUrl = data.Location

      // respond to succesful `create` with status 201 and JSON of new "example"
      return Profile.create({
        profileUrl: profileUrl,
        name: req.body.name,
        title: req.body.title,
        education: req.body.education,
        description: req.body.description,
        location: req.body.location,
        skills: req.body.skills,
        salary: req.body.salary,
        contact: req.body.contact,
        website: req.body.website,
        portfolio: req.body.portfolio,
        other: req.body.other,
        owner: req.user.id
      })
    })
    .then(profile => {
      res.status(201).json({ profile: profile.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
router.patch('/profiles/:id', [upload.single('file'), requireToken], removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  // delete req.body.profile.owner

  Profile.findById(req.params.id)
    .then(handle404)
    .then(profile => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, profile)

      // pass the result of Mongoose's `.update` to the next `.then`
      return profile.updateOne({
        profilelUrl: req.body.profileUrl,
        name: req.body.name,
        title: req.body.title,
        education: req.body.education,
        description: req.body.description,
        location: req.body.location,
        skills: req.body.skills,
        salary: req.body.salary,
        contact: req.body.contact,
        website: req.body.website,
        portfolio: req.body.portfolio,
        other: req.body.other,
        owner: req.user.id
      })
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/profiles/:id', requireToken, (req, res, next) => {
  Profile.findById(req.params.id)
    .then(handle404)
    .then(profile => {
      // throw an error if current user doesn't own `example`
      requireOwnership(req, profile)
      // delete the example ONLY IF the above didn't throw
      profile.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
