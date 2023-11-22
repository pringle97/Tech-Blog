const router = require('express').Router()
const passport = require('passport')
const { Post, User, Comment } = require('../models')

router.get('/comments', passport.authenticate('jwt'), async function (req, res) {
  const comments = await Comment.findAll({ include: [User, Post] })
  res.json(comments)
})

router.get('/comments/:id', passport.authenticate('jwt'), async function (req, res) {
  const comments = await Comment.findAll({ where: { pid: req.params.id }, include: [User] })
  res.json(comments)
})

router.post('/comments', passport.authenticate('jwt'), async function (req, res) {
  console.log(req.body) 
  const comments = await Comment.create({ 
    content: req.body.content,
    uid: req.user.id,
    pid: req.body.pid
  })
  res.json(comments)
})

router.delete('/comments/:id', passport.authenticate('jwt'), async function (req, res) {
  await Post.destroy({ where: { id: req.params.id } })
  res.sendStatus(200)
})

module.exports = router