const router = require('express').Router()
const passport = require('passport')
const { Post, User, Comment } = require('../models')

// get comments
router.get('/comments', passport.authenticate('jwt'), async function (req, res) {
  const comments = await Comment.findAll({ include: [User, Post] })
  res.json(comments)
  console.log(comments)
})

//post a comment
router.post('/:id', passport.authenticate('jwt'), async function (req, res) {
  const comments = await Comment.create({
    content: req.body.content,
    pid: req.body.pid,
    uid: req.session.userId,
    username: req.session.username
  })
  res.json(comments)
})

router.delete('/comments/:id', passport.authenticate('jwt'), async function (req, res) {
  await Post.destroy({ where: { id: req.params.id } })
  res.sendStatus(200)
})

module.exports = router