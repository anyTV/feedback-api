module.exports = {
  ENABLE_DB_LOG: true,
  FIELDS: [{
    name: 'description',
    required: true
  },
  { name: 'screenshot' },
  { name: 'additionalinfo' },
  { name: 'version' }],

  TABLE_NAME: 'feedback'
}
