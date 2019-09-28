let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Recipe'

let schema = new Schema({
  name: {type: String, required: true},
  ingredients: {type: Array, required: true},
  calories: {type: Number, required: true},
  carbs: {type: Number, required: true},
  fat: {type: Number, required: true},
  protein: {type: Number, required: true}
})

module.exports = mongoose.model(schemaName, schema)