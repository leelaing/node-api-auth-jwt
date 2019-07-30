const router = require('express').Router()
const userModel = require('../models/User')
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
  // Validate before the user is created
  const { error } = registerValidation(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  // Check to see if user already exsists
  const emailExists = await userModel.findOne({
    email: req.body.email
  })
  if (emailExists) return res.status(400).send('Email already exists')

  // Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  // Create a new user
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  try {
    const savedUser = await user.save()
    res.send(savedUser)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/login', async (req, res) => {
  // Validate before the user is created
  const { error } = loginValidation(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  // Check to see if user already exsists
  const validUser = await userModel.findOne({
    email: req.body.email
  })
  if (!validUser) return res.status(400).send('Email is not a registered email')
  // Check to see if Password is matching Hashed password
  const validPassword = await bcrypt.compare(
    req.body.password,
    validUser.password
  )
  if (!validPassword) return res.status(400).send('Password is incorrect!')
  res.send(`Logged in as ${validUser.email}`)
})

module.exports = router
