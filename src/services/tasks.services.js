const tasksControllers = require('../controllers/tasks.controllers')
const { setErrorResposne } = require('../utils/functions')

/**
 * 
 * @param {import('express').Request} req
 * @param {Response} res 
 */
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params, { id: userId } = req.user
    const data = await tasksControllers.getTaskById(id, userId)
    res.status(200).json(data)

  } catch (error) {
    setErrorResposne(res, error.message)
  }
}

/**
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res 
 */
const getAllTasks = async (req, res) => {
  try {
    const { id: userId } = req.user
    const data = await tasksControllers.getAllTasks(userId)
    res.status(200).json(data)

  } catch (error) {
    setErrorResposne(res, error.message)
  }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const createTask = async (req, res) => {
  try {
    const { id: userId } = req.user
    const { title, description, notificationAt } = req.body
    if(!title && !description) return setErrorResposne(res, 'Missing data', 400, {
      title: 'string',
      description: 'string',
    })
    const data = await tasksControllers.createTask({userId, title, description, notificationAt})
    res.status(201).json(data)

  } catch (error) {
    setErrorResposne(res, error.message)
  }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const updateTask = async (req, res) => {
  try {
    const { id: userId } = req.user, { id } = req.params
    const { title, description, notificationAt, isCompleted  } = req.body

    if(!title && !description && !notificationAt && (typeof isCompleted == 'undefined')) return setErrorResposne(res, 'You must provide at least one of the following fields', 400, {
      title: 'string',
      description: 'string',
      notificationAt: 'string',
      isCompleted: 'boolean'
    })
    const updateData = await tasksControllers.updateTask(id, userId, {
      title, description, notificationAt, isCompleted
    })
    if(!updateData[0]) return setErrorResposne(res, 'An error occurred while updating')
    
    const data = await tasksControllers.getTaskById(id, userId)
    res.status(200).json(data)

  } catch (error) {
    setErrorResposne(res, error.message)
  }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const deleteTask = async (req, res) => {
  try {
    const { id: userId } = req.user, { id } = req.params
    const data = await tasksControllers.deleteTask(id, userId)
    res.status(204).json(data)

  } catch (error) {
    setErrorResposne(res, error.message)
  }
}

module.exports = {
  getTaskById,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
}