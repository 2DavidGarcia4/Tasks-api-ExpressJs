const router = require('express').Router()
const passport = require('passport')
const tasksServices = require('../services/tasks.services')

require('../middlewares/auth.middleware')(passport)

router
  .route('/')
  .get(
    passport.authenticate('jwt', {session: false}),
    tasksServices.getAllTasks
  )
  .post(
    passport.authenticate('jwt', {session: false}),
    tasksServices.createTask
  )

router
  .route('/:id')
  .get(
    passport.authenticate('jwt', {session: false}),
    tasksServices.getTaskById
  )
  .put(
    passport.authenticate('jwt', {session: false}),
    tasksServices.updateTask
  )
  .delete(
    passport.authenticate('jwt', {session: false}),
    tasksServices.deleteTask
  )



module.exports = router