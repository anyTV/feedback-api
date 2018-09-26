import feedback from './controller'

const route = require('express').Router()

route.route('/')
  .post(feedback.record)

module.exports = route
