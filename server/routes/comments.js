const router = require('express').Router()
const Comment = require('../models/Comment')
const auth = require('../middleware/auth')

router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name')
      .sort({ createdAt: -1 })
    res.json(comments)
  } catch {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.post('/:postId', auth, async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.text,
      author: req.user.id,
      post: req.params.postId
    })
    const populated = await comment.populate('author', 'name')
    res.json(populated)
  } catch {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

module.exports = router