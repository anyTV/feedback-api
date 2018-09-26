const config = require('./build/src/config')
const LOGGER = require('./build/src/logger').default
const router = require('./build/src/router')

class FEEDBACK {
  constructor (options) {
    config.config(options)
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
