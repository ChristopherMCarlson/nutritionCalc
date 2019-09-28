let mongoose = require('mongoose')
const connectionString = 'mongodb://admin:nutrition1@ds213832.mlab.com:13832/nutirtioncalcdb'
let connection = mongoose.connection

console.log("one", connectionString)

mongoose.connect(connectionString, { useNewUrlParser: true })
console.log("past here")

connection.on('error', err => {
  console.log("DATABASE ERROR: ", err)
})

connection.once('open', () => {
  console.log("Connected to Database")
})