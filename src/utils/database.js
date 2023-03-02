const { Sequelize } = require('sequelize')
const { config } = require('../config')

const { db: { name, host, username, password } } = config

const sequelize = new Sequelize(name, username, password, {
  host,
  dialect: 'postgres'
})

module.exports = {
  sequelize,
}