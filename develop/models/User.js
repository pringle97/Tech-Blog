const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connections')
const bcrypt = require('bcrypt')
class User extends Model {
  checkPassword(credentials) {
    return bcrypt.compareSync(credentials, this.password)
  }
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER, allowNull: false,
      primaryKey: true, 
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData
      }
    },
    sequelize, modelName: 'user'
  }
)