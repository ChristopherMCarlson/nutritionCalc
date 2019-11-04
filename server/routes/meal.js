let router = require('express').Router()
let Meals = require('../models/meal')

router.post('/createMeal', (req, res, next) => {
  Meals.create(req.body)
    .then(newMeal => {
      console.log("Meal Created!")
      res.send(newMeal)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

router.get('/:userId', (req, res, next) => {
  Meals.find({ user: req.params.userId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

router.put('/update/:foodId', (req, res, next) => {
  Meals.findByIdAndUpdate(req.params.foodId, req.body)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

router.delete('/delete/:foodId', (req, res, next) => {
  Meals.deleteOne({ _id: req.params.foodId })
    .then(data => {
      res.send(data)
      console.log("Meal deleted!")
    })
    .catch(err => {
      res.send(400).send(err)
    })
})


module.exports = router 