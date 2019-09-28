let router = require('express').Router()
let Users = require('../models/user')

router.get('/', (req, res, next) => {
  // @ts-ignore
  Users.find({ _id: req.session.uid })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

module.exports = router 