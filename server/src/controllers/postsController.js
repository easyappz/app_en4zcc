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
    const posts = await Post.find().sort({ createdAt: -1 })
      .populate('authorId', 'name avatar')
      .populate('comments.userId', 'name avatar');
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

async function unlikePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    post.likes = post.likes.filter(id => id.toString() !== req.userId.toString());
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function addComment(req, res) {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    post.comments.push({ userId: req.userId, text });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createPost, getPosts, likePost, unlikePost, addComment };
