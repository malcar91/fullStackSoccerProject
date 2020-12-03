const express = require('express')
const passport = require('passport')

const Team = require('./../models/teams')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', {session: false})

const router = express.Router()

// CREATE
router.post('/teams', requireToken, (req, res, next) => {
  req.body.team.owner = req.user.id
  const teamData = req.body.team
  Team.create(teamData)
    .then(team => {
      res.status(201).json({ team: team.toObject() })
    })
    .catch(next)
})

// INDEX
router.get('/teams', requireToken, (req, res, next) => {
  Team.find()
    .then(teams => {
      return teams.map(example => example.toObject())
    })
    .then(teams => res.status(200).json({ teams: teams }))
    .catch(next)
})

// SHOW
router.get('/teams/:id', requireToken, (req, res, next) => {
  Team.findById(req.params.id)
    .then(handle404)
    .then(team => res.status(200).json({ team: team.toObject() }))
    .catch(next)
})

// UPDATE
router.patch('/teams/:id', requireToken, removeBlanks, (req, res, next) => {
  // const teamData = req.body.team
  delete req.body.team.owner
  // const id = req.params.id
  Team.findById(req.params.id)
    .then(handle404)
    .then(team => {
      requireOwnership(req, team)
      return team.updateOne(req.body.team)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
router.delete('/teams/:id', requireToken, (req, res, next) => {
  Team.findById(req.params.id)
    .then(handle404)
    .then(team => {
      requireOwnership(req, team)
      team.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
