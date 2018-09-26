'use strict'

const _ = require('lodash')
const path = require('path')

const config = {
  PORT: 3000,
  MAXPAYLOAD: '5mb',

  DATABASE: {
    host: 'localhost',
    user: 'root',
    password: 'test',
    database: 'feedback-dev',
    timezone: 'utc',
    connectionLimit: 5,
    charset: 'utf8_unicode_ci',
    multipleStatements: true
  },

  use: (env) => {
    _.merge(config, require(path.join(__dirname, '/env/', env)))
    return config
  }
}

// set development as default
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

module.exports = config.use(process.env.NODE_ENV)
