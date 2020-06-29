const express = require('express')
const router = express.Router()

const Team = require('./../models/teams')

// CREATE
router.post('/teams', (req, res, next) => {
  const teamData = req.body.team
  Team.create(teamData)
    .then(team => res.status(201).json({team: team}))
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
