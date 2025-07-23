const User = require('@src/models/User');

async function getProfile(req, res) {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateProfile(req, res) {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getProfile, updateProfile };
