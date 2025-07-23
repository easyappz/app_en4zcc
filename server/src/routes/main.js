const express = require('express');
const mongoose = require('mongoose');
const { register, login } = require('@src/controllers/authController');
const { getProfile, updateProfile } = require('@src/controllers/profileController');
const { createPost, getPosts, likePost } = require('@src/controllers/postsController');
const authMiddleware = require('@src/middlewares/authMiddleware');

/**
 * Пример создания модели в базу данных
 */
// const MongoTestSchema = new mongoose.Schema({
//   value: { type: String, required: true },
// });

// const MongoModelTest = mongoose.model('Test', MongoTestSchema);

// const newTest = new MongoModelTest({
//   value: 'test-value',
// });

// newTest.save();

const router = express.Router();

// GET /api/hello
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// GET /api/status
router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// POST /api/register
router.post('/register', register);

// POST /api/login
router.post('/login', login);

// GET /api/profile
router.get('/profile', authMiddleware, getProfile);

// PATCH /api/profile
router.patch('/profile', authMiddleware, updateProfile);

// POST /api/posts
router.post('/posts', authMiddleware, createPost);

// GET /api/posts
router.get('/posts', authMiddleware, getPosts);

// POST /api/posts/:id/like
router.post('/posts/:id/like', authMiddleware, likePost);

module.exports = router;
