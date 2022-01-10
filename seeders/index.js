require('dotenv').config()

const { User, Post } = require('../models')
const sequelize = require('../config/connections.js')

async function seeder() {
  await sequelize.sync({ force: true })

  console.log('----Seeding Data----')

  try {
    await User.register(new User({ username: 'johndoe', email: 'johndoe@gmail.com' }), 'password1234')
    await User.register(new User({ username: 'janedoe', email: 'janedoe@gmail.com' }), 'password4321')
    await User.register(new User({ username: 'jackdoe', email: 'jackdoe@gmail.com' }), 'rootroot')
    await Post.bulkCreate(require('./postSeed.js'))
  } catch (err) {
    console.log(err)
  }


  console.log('----Data Seeded----')

  process.exit()
}

seeder()