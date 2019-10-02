let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Food'

let schema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  protein: { type: Number, required: true }
})

//THIS IS A TEST!!!

module.exports = mongoose.model(schemaName, schema)