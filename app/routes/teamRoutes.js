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
router.get('/teams', (req, res, next) => {
  Team.find()
    .then(teams => res.json({teams: teams}))
    .catch(next)
})

// SHOW
router.get('/teams/:id', (req, res, next) => {
  Team.findById(req.params.id)
    .then(team => res.json({team: team}))
    .catch(next)
})

// UPDATE
router.patch('/teams/:id', (req, res, next) => {
  const teamData = req.body.team
  const id = req.params.id
  Team.findById(id)
    .then(team => team.update(teamData))
    .then(() => res.sendStatus(201))
    .catch(next)
})

// DESTROY
router.delete('/teams/:id', (req, res, next) => {
  Team.findById(req.params.id)
    .then(team => team.remove())
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
