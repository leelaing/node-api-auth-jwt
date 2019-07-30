const router = require('express').Router()
const userModel = require('../models/User')
const { registerValidation, loginValidation } = require('../validation')

router.post('/register', async (req, res) => {
  // Validate before the user is created
  const { error } = registerValidation(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  // Check to see if user already exsists
  const emailExists = await userModel.findOne({
    email: req.body.email
  })
  if (emailExists) return res.status(400).send('Email already exists')
  // Create a new user
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  try {
    const savedUser = await user.save()
    res.send(savedUser)
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
