import db from './db_helper'
import squel from './mysql_squel'
import { BaseClass } from './base_class'
import config from './config'

class Repository extends BaseClass {
  constructor () {
    super('Repository')
  }

  record (fields) {
    this.log('debug', 'storing feedback')
    let query = squel
      .insert()
      .into(config.TABLE_NAME)
      .setFields(fields)
    return db.query(query)
  }
}

export default new Repository()
