const express = require('express')
const { config: { port } } = require('./config')
const { sequelize } = require('./utils/database')
const { initModels } = require('./models/initModels')
const cors = require('cors')

//? Routes
const authRouters = require('./routes/auth.routes')
const usersRoutes = require('./routes/users.routes')
const tasksRoutes = require('./routes/tasks.routes')

const app = express()
const route = 'http://localhost:9000/', prefix = `/api/v1/`

app.use(express.json())
app.use(cors())
app.use(`${prefix}auth`, authRouters)
app.use(`${prefix}users`, usersRoutes)
app.use(`${prefix}tasks`, tasksRoutes)


app.get(`${prefix}ping`, (req, res) => {
  res.json({message: 'Pong'})
})



;(async () => {
  try {
    await sequelize.sync({force: false});
    console.log('Connection has been established successfully.');
    initModels()

    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()