const { Sequelize } = require('sequelize')
const { config } = require('../config')

const { dbUrl } = config

// const sequelize = new Sequelize(name, username, password, {
//   host,
//   dialect: 'postgres'
// })

const sequelize = new Sequelize(dbUrl)


module.exports = {
  sequelize,
}