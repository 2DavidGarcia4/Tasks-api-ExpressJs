const router = require('express').Router()
const { login } = require('../services/auth.services')
const { createUser } = require('../services/users.services')

router.post('/register', createUser)
router.post('/login', login)

module.exports = router