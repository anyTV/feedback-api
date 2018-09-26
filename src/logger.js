class Logger {
  constructor () {
    this._logger = console
  }

  set_logger (logger) {
    this._logger = logger
  }

  log (level, ...args) {
    this._logger[level](...args)
  }
}
export default new Logger()
