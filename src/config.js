const { config: envConfig } = require('dotenv')
envConfig()

const config = {
  port: process.env.PORT || 9000,
  nodeEnv: process.env.NODE_ENV || 'development', 
  jwtSecret: process.env.JWT_SECRET || 'secret',
  dbUrl: process.env.DATABASE_URL
}

module.exports = { config }