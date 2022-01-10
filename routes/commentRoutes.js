const router = require('express').Router()
const passport = require('passport')
const { Post, User, Comment } = require('../models')

router.get('/comments', async function (req, res) {
  const comments = await Comment.findAll({ include: [Post] })
  res.json(comments)
})

router.get('/comments/:pid', async function (req, res) {
  const comments = await Comment.findAll({ where: { pid: req.params.pid }})
  res.json(comments)
})

router.post('/comments', passport.authenticate('jwt'), async function (req, res) {
  console.log(req.body) 
  const comment = await Comment.create({ 
    content: req.body.content,
    uid: req.user.id,
    pid: req.body.pid
  })
  res.json(comment)
})

module.exports = router