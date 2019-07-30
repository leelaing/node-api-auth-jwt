const express = require('express')
const app = express()

// Import routes
const authRoute = require('./routes/auth')

// Route Middleware
app.use('/api/user', authRoute)

app.listen(4000, () => console.log('Server now running on port 4000'))
