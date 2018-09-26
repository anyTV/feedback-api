import logger from './logger'

class BaseClass {
  constructor (class_name) {
    this._class_name = class_name
  }

  log (level, ...args) {
    logger.log(level, `[${this._class_name}]`, ...args)
  }
}
export {
  BaseClass
}
