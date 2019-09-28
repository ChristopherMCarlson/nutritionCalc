let router = require('express').Router()
let Foods = require('../models/food')

router.post('/createFood', (req, res, next) => {
  Foods.create(req.body)
    .then(newFood => {
      console.log("Food Created!")
      res.send(newFood)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

router.get('/:userId', (req, res, next) => {
  Foods.find({ user: req.params.userId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

router.put('/update/:foodId', (req, res, next) => {
  Foods.findByIdAndUpdate(req.params.foodId, req.body)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

router.delete('/delete/:foodId', (req, res, next) => {
  Foods.deleteOne({ _id: req.params.foodId })
    .then(data => {
      res.send(data)
      console.log("Task deleted!")
    })
    .catch(err => {
      res.send(400).send(err)
    })
})


module.exports = router 