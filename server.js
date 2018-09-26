
'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const winston = require('winston')
const Feedback = require('./index')
const config = require('./build/src/config')

// logger setup
winston.remove(winston.transports.Console)
winston.add(winston.transports.Console, {
  level: 'debug',
  colorize: true
})

// feedback setup
let feedback_api = new Feedback({
  DATABASE: config.DATABASE
}).set_logger(winston)

// server setup
const app = express()

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json({ limit: config.MAXPAYLOAD }))
app.use(cors('*'))

// feedback route
app.use('/api/feedback', feedback_api.router)

let port = config.PORT
try {
  app.listen(port)
  winston.info(`start listening on port ${port}`)
} catch (e) {
  winston.error(e)
  process.exit(1)
}
