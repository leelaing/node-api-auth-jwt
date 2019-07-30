const router = require('express').Router()
const verify = require('./verifyToken')

router.get('/', verify, (req, res) => {
  res.send(req.user)
  //   User.findByOne({ _id: req.user })
  //   res.json({
  //     posts: {
  //       title: 'My 1st Post',
  //       content: 'This is the first post content.'
  //     }
  //   })
})
module.exports = router
