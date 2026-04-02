const router = require('express').Router()
const Post = require('../models/Post')
const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name').sort({ createdAt: -1 })
    res.json(posts)
  } catch {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name')
    if (!post) return res.status(404).json({ message: 'Пост не найден' })
    res.json(post)
  } catch {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'journalist') return res.status(403).json({ message: 'Нет доступа' })
    const post = await Post.create({ ...req.body, author: req.user.id })
    res.json(post)
  } catch {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'journalist') return res.status(403).json({ message: 'Нет доступа' })
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(post)
  } catch {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'journalist') return res.status(403).json({ message: 'Нет доступа' })
    await Post.findByIdAndDelete(req.params.id)
    res.json({ message: 'Пост удалён' })
  } catch {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

module.exports = router