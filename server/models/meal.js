let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Meal'

let schema = new Schema({
  meal: { type: String, required: true },
  calories: { type: Number, required: true },
  date: { type:String, required:true },
  user: { type: String, required: true }
})

module.exports = mongoose.model(schemaName, schema)