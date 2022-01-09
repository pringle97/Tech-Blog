const router = require('express').Router()
const passport = require('passport')
const { Post, User, Comment } = require('../models')

router.get('/', async function (req, res) {
  const comments = await Comment.findAll({ include: [Post] })
  res.json(comments)
})

router.get('/:postId', async function (req, res) {
  const comments = await Comment.findAll({ where: { req.params.postId }})
  res.json(comments)
})

router.get('/', passport.authenticate('jwt'), async function (req, res) {
  console.log(req.body) 
  const comment = await Comment.create({ 
    ...req.body
  })
})