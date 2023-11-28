const router = require('express').Router()
const { Post, User, Comment } = require('../models')
const passport = require('passport')

// GET all posts
router.get('/posts', passport.authenticate('jwt'), async function (req, res) {
  const posts = await Post.findAll({ include: [User, Comment] })
  res.json(posts)
})

router.get('/posts/:id', passport.authenticate('jwt'), async function (req, res) {
  const posts = await Post.findOne({ where: { id: req.params.id }, include: [User, Comment] })
  res.json(posts)
})

// POST one post
router.post('/posts', passport.authenticate('jwt'), async function (req, res) {
  const post = await Post.create({
    content: req.body.content,
    title: req.body.title,
    uid: req.user.id
  })
  res.json(post)
})

// DELETE one post
router.delete('/posts/:id', passport.authenticate('jwt'), async function (req, res) {
  await Post.destroy({ where: { id: req.params.id } })
  res.sendStatus(200)
})

module.exports = router