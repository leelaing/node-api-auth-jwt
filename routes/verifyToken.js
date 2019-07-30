const jwt = require('jsonwebtoken')

// Middleware
module.exports = function(req, res, next) {
  const token = req.header('auth-token')
  if (!token)
    return res
      .status(401)
      .send('Access denied, Please create an account or Login to gain access!')
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).send('Invalid Token')
  }
}
