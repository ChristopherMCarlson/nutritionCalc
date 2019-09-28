let router = require('express').Router()
let Recipes = require('../models/recipe')

router.post('/createRecipe', (req, res, next) => {
  Recipes.create(req.body)
    .then(newRecipe => {
      console.log("Recipe Created!")
      res.send(newRecipe)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

router.get('/:userId', (req, res, next) => {
  Recipes.find({ user: req.params.userId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

router.put('/update/:recipeId', (req, res, next) => {
  Recipes.findByIdAndUpdate(req.params.recipeId, req.body)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

router.delete('/delete/:recipeId', (req, res, next) => {
  Recipes.deleteOne({ _id: req.params.recipeId })
    .then(data => {
      res.send(data)
      console.log("Task deleted!")
    })
    .catch(err => {
      res.send(400).send(err)
    })
})


module.exports = router 