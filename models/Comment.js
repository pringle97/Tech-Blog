const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

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