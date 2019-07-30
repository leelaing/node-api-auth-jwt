require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

// Connect to db
mongoose.connect(
  process.env.DB_CONNECT_STRING,
  { useNewUrlParser: true },
  () => {
    console.log('Connected to db!')
  }
)
// Import routes
const authRoute = require('./routes/auth')

// Route Middleware
app.use('/api/user', authRoute)

app.listen(process.env.PORT, () =>
  console.log(`Server now running on port ${process.env.PORT}`)
)
