const router = require('express').Router()
const passport = require('passport')
const { Post, User } = require('../models')

router.get('/', passport.authenticate('jwt'), async function (req, res) {
  const posts = await Post.findAll({ include: [User] })
  res.json(posts)
})

// POST one post
router.post('/', passport.authenticate('jwt'), async function ({ body, user }, res) {
  const post = await Post.create({
    ...body,
    userId: user.id
  })
  res.json(post)
})

// DELETE one post
router.delete('/:id', passport.authenticate('jwt'), async function ({ params: { id } }, res) {
  await Post.destroy({ where: { id } })
  res.sendStatus(200)
})

module.exports = router