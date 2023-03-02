const { UsersModel } = require('./Users')
const { TasksModel } = require('./Tasks')

const initModels = () => {
  UsersModel.hasMany(TasksModel)
  TasksModel.belongsTo(UsersModel)
}

module.exports = {
  initModels
}
