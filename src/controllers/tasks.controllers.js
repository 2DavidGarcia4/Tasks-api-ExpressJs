const { v4 } = require('uuid')
const { TasksModel } = require('../models/Tasks')

/**
 * 
 * @param {string} id 
 * @param {string} userId 
 * @returns 
 */
const getTaskById = (id, userId) => {
  return TasksModel.findOne({
    where: {
      id,
      userId
    }
  })
}

/**
 * 
 * @param {string} userId 
 * @returns 
 */
const getAllTasks = (userId) => {
  return TasksModel.findAll({
    where: {
      userId
    }
  })
}

/**
 * 
 * @param {{userId: string, title: string, description: string, notificationAt: string}} taskData 
 * 
 */
const createTask = (taskData) => {
  return TasksModel.create({id: v4(), createdAt: Date.now(), ...taskData})
}

/**
 * 
 * @param {string} id 
 * @param {string} userId 
 * @param {{title: string, description: string, notificationAt: string, isCompleted: boolean}} taskData 
 * @returns 
 */
const updateTask = (id, userId, taskData) => {
  const data = taskData.isCompleted ? {completedAt: Date.now(), ...taskData} : {completedAt: null, ...taskData}
  return TasksModel.update(data, {
    where: {
      id, 
      userId
    }
  })
}

/**
 * 
 * @param {string} id
 * @param {string} userId 
 * @returns 
 */
const deleteTask = (id, userId) => {
  return TasksModel.destroy({
    where: {
      id,
      userId
    }
  })
}

module.exports = {
  getTaskById,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
}