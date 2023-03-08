const usersControllers = require('../controllers/users.controllers')
const { setErrorResposne } = require('../utils/functions')
const { hashPassword } = require('../utils/functions')



/**
 * 
 * @param {import('express').Request} req 
 * @param {Response} res 
 */
const getMy = async (req, res) => {
  try {
    const { id } = req.user
    const user = await usersControllers.getUserById(id)
    res.status(200).json(user)

  } catch (error) {
    setErrorResposne(res, error.message)
  }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {Response} res 
 */
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if(!name || !email || !password) return setErrorResposne(res, 'All fields must be completed', 400, {
      name: 'string',
      email: 'string',
      password: 'string'
    })
    const data = await usersControllers.createUser({name, email, password: hashPassword(password)})
    res.status(201).json(data) 

  } catch (error) {
    setErrorResposne(res, error.message)
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.user
    const { name, email, password, imageUrl } = req.body
    if(!name && !email && !password && !imageUrl) return setErrorResposne(res, 'You must provide at least one of the following fields', 400, {
      name: 'string',
      email: 'string',
      password: 'string',
      imageUrl: 'string'
    })
    const updateData = await usersControllers.updateUser(id, {name, email, password: password ? hashPassword(password) : undefined, imageUrl})
    if(!updateData[0]) return setErrorResposne(res, 'An error occurred while updating')
    
    const data = await usersControllers.getUserById(id)
    
    res.status(200).json(data)

  } catch (error) {
    setErrorResposne(res, error.message)
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.user
    const data = await usersControllers.deleteUser(id)
    res.status(201).json(data)

  } catch (error) {
    setErrorResposne(res, error.message)
  }
}


module.exports = {
  getMy,
  createUser,
  updateUser,
  deleteUser
}