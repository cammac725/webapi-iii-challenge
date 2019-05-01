const express = require('express');
const Users = require('../data/helpers/userDb');

const router = express.Router();

router.use(express.json());
router.use(capName);

function capName(req, res, next) {
  req.body.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
  next();
}

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await Users.get(req.query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving the users' })
  }
})

//Get a user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await Users.getById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User could not be found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the user' })
  }
})

// Get all a user's posts
router.get('/:id/posts', async (req, res) => {
  try {
    const userPosts = await (Users.getUserPosts(req.params.id));
    res.status(200).json(userPosts);
  } catch (error) {
    es.status(500).json({ message: 'Error getting the messages for the user' });
  }
})

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const count = await Users.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The user has been removed' })
    } else {
      res.status(404).json({ message: 'User could not found' })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error removing the user',
    });
  }
})

//Create a new user
router.post('/', capName, async (req, res) => {
  try {
    const user = await Users.insert(req.body);
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      message: 'Error adding the user',
    });
  }
})

// Update a user's name
router.put('/:id', capName, async (req, es) => {
  try {
    const user = await Users.update(req.params.id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User could not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating the user' })
  }
})



module.exports = router;