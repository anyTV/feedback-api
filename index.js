const _ = require('lodash')
const config = require('./build/src/config')
const LOGGER = require('./build/src/logger').default
const db_helper = require('./build/src/db_helper').default
const router = require('./build/src/router')

class FEEDBACK {
  constructor (options) {
    _.merge(config, options)

    // validate
    if (_.isEmpty(config.DATABASE)) {
      throw new Error('missing DATABASE')
    }

    // init database config
    db_helper.config(config.DATABASE)
  }

  set_logger (logger) {
    LOGGER.set_logger(logger)
    return this
  }

  get router () {
    return router
  }
}

module.exports = FEEDBACK
