'use strict'

import _ from 'lodash'
import repository from './repository'
import config from './config'
import { BaseClass } from './base_class'

class Controller extends BaseClass {
  constructor () {
    super('Controller')
    _.bindAll(this, ['record'])
  }

  record (req, res) {
    let required_fields = _(config.FIELDS).filter('required').map(f => f.name).value()
    // validate
    if (_.some(required_fields, field => _.isEmpty(_.get(req.body, field)))) {
      return res.status(400).json({
        code: 'FAILED',
        message: 'MISSING REQUIRED FIELD'
      })
    }

    let fields = _.pick(req.body, _.map(config.FIELDS, 'name'))
    repository
      .record(fields)
      .then(() => {
        this.log('debug', 'Feedback recorded:', _.pick(req.body, 'description'))
        res.status(200).json({
          code: 'OK',
          message: 'FEEDBACK RECORDED'
        })
      }).catch(error => {
        this.log('error', error)
        res.status(500).json({
          code: 'FAILED',
          message: error.message
        })
      })
  }
}

export default new Controller()
