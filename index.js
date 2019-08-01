require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors)

// Import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

// Connect to db
mongoose.connect(
  process.env.DB_CONNECT_STRING,
  { useNewUrlParser: true },
  () => {
    console.log('Connected to db!')
  }
)

// Middleware
app.use(express.json())

// Route Middleware
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(process.env.PORT, () =>
  console.log(`Server now running on port ${process.env.PORT}`)
)
