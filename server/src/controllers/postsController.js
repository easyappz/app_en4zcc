const Post = require('@src/models/Post');

async function createPost(req, res) {
  try {
    const { content, image } = req.body;
    const post = new Post({ authorId: req.userId, content, image });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getPosts(req, res) {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('authorId', 'name avatar');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function likePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (!post.likes.includes(req.userId)) {
      post.likes.push(req.userId);
      await post.save();
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createPost, getPosts, likePost };
