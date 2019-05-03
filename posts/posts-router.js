const express = require('express');
const Posts = require('../data/helpers/postDb');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.get(req.query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving the posts' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.getById(req.params.id);
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'Post could not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving the post' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The post has been removed' })
    } else {
      res.status(404).json({ message: 'Post could not found' })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error removing the post',
    });
  }
})

router.post('/', async (req, res) => {
  try {
    const post = await Posts.insert(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: 'Error adding the post',
    });
  }
})

router.put('/:id', async (req, res) => {
  try {
    const post = await Posts.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post could not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating the post' })
  }
})

module.exports = router;