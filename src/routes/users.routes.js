const router = require('express').Router()
const passport = require('passport')
const usersServices = require('../services/users.services')

require('../middlewares/auth.middleware')(passport)

router
.route('/me')
.get(
  passport.authenticate('jwt', {session: false }),
  usersServices.getMy
)
.put(
  passport.authenticate('jwt', {session: false }),
  usersServices.updateUser
)
.delete(
  passport.authenticate('jwt', {session: false }),
  usersServices.deleteUser
)

module.exports = router