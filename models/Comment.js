const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connections')

class Comment extends Model {

}

Comment.init(
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize
  }
)

module.exports = Comment