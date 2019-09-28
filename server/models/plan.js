let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Plan'

let schema = new Schema({
  day: {type: Date, required: true},
  recipes: {type: Array, required: true},
  user: {type: String, required: true}
})

module.exports = mongoose.model(schemaName, schema)