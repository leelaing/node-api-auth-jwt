const router = require('express').Router()

router.post('/register', (req, res) => {
  res.send('Register path')
})

module.exports = router
