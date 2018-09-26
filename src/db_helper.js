import mysql from 'anytv-node-mysql'
import _ from 'lodash'
import squel from './mysql_squel'
import config from './config'
import { BaseClass } from './base_class'

const DEFAULT_DB = 'feedback-api-db'

class DBHelper extends BaseClass {
  constructor () {
    super('DBHelper')
  }

  config (dbConfig) {
    mysql
      .add(DEFAULT_DB, dbConfig, true)
    this._is_configured = true
  }

  _getDB () {
    if (!this._is_configured) {
      throw new Error('Database not configure yet!')
    }

    return mysql.use(DEFAULT_DB)
      .retry_if(['ER_LOCK_DEADLOCK'])
      .set_max_retry(3)
  }

  _log (query) {
    if (!query) {
      return
    }

    if (config.ENABLE_DB_LOG) {
      if (squel.cls.isSquelBuilder(query)) {
        this.log('info', '## SQL', query.toString())
      } else if (query.query) {
        this.log('info', '## SQL', query.query)
      } else {
        this.log('info', '## SQL', query)
      }
    }
  }

  _refineData (promise, cbRefineData) {
    if (_.isFunction(cbRefineData)) {
      return promise.then(data => Promise.resolve(cbRefineData(data))).catch(error => Promise.reject(error))
    }

    return promise
  }

  _parseQueryParams (args) {
    let query, queryParams, cbRefineData

    if (args.length === 0) {
      throw new Error('query is required')
    }

    query = args[0]
    if (args.length <= 2) {
      if (_.isFunction(args[1])) {
        cbRefineData = args[1]
        queryParams = []
      } else {
        cbRefineData = null
        queryParams = args[1]
      }
    } else {
      queryParams = args[1]
      cbRefineData = args[2]
    }

    return { query, queryParams, cbRefineData }
  }

  _parseTransactionParams (args) {
    let queries, cbRefineData
    if (args.length === 0) {
      throw new Error('query is required')
    }

    if (_.isArray(args[0])) {
      queries = args[0]
      cbRefineData = args[1]
    } else {
      if (squel.cls.isSquelBuilder(args[0])) {
        queries = [args[0]]
        cbRefineData = args[1]
      } else {
        queries = [{
          query: args[0],
          queryParams: args[1]
        }]
        cbRefineData = args[2]
      }
    }

    return { queries, cbRefineData }
  }

  /*
  query(query)
  query(query, queryParams)
  query(query, cbRefineData)
  query(query, queryParams, cbRefineData)
  query(squel)
  query(squel, cbRefineData)
  */
  query () {
    let { query, queryParams, cbRefineData } = this._parseQueryParams(arguments)
    this._log(query)

    let promise
    if (squel.cls.isSquelBuilder(query)) {
      promise = this._getDB().build(query).promise()
    } else {
      promise = this._getDB().build(query, queryParams || []).promise()
    }

    return this._refineData(promise, cbRefineData)
  }
}
export default new DBHelper()
