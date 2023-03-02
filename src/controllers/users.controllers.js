const { UsersModel } = require('../models/Users')
const { v4 } = require('uuid')
const { TasksModel } = require('../models/Tasks')

/**
 * 
 * @param {string} id 
 */
const getUserById = (id) => {
  return UsersModel.findOne({
    where: {
      id
    },
    attributes: {
      exclude: 'password'
    },
    include: [
      {
        model: TasksModel,
        attributes: {
          exclude: 'userId'
        }
      }
    ]
  })
}

/**
 * 
 * @param {string} email 
 */
const getUserByEmail = (email) => {
  return UsersModel.findOne({
    where: {
      email
    }
  })
}

/**
 * 
 * @param {{name: string, email: string, password: string }} userData 
 * @returns 
 */
const createUser = (userData) => {
  return UsersModel.create({id: v4(), ...userData})
}

/**
 * 
 * @param {string} id 
 * @param {{name: string, email: string, password: string, imageUrl: string }} userData 
 * @returns 
 */
const updateUser = (id, userData) => {
  return UsersModel.update(userData, {
    where: {
      id
    }
  })
}

/**
 * 
 * @param {string} id 
 * @returns 
 */
const deleteUser = (id) => {
  return UsersModel.destroy({
    where: {
      id
    }
  })
}

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
}