'use strict'

const _ = require('lodash')
const path = require('path')
const db_helper = require('./../db_helper').default

const config = {
  PORT: 3000,
  MAXPAYLOAD: '5mb',

  ENABLE_DB_LOG: true,
  FIELDS: [{
    name: 'description',
    required: true
  },
  { name: 'screenshot' },
  { name: 'additionalinfo' },
  { name: 'version' }],

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
  TABLE_NAME: 'feedback',

  use: (env) => {
    _.merge(config, require(path.join(__dirname, '/env/', env)))
    return config
  },

  config (options) {
    // validate
    if (_.isEmpty(options.DATABASE)) {
      throw new Error('missing DATABASE')
    }

    _.merge(config, options)

    // init database config
    db_helper.config(config.DATABASE)
  }
}

// set development as default
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

module.exports = config.use(process.env.NODE_ENV)
