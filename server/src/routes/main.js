const express = require('express');
const mongoose = require('mongoose');
const { register, login } = require('@src/controllers/authController');

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

module.exports = router;
