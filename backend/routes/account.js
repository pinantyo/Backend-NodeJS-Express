const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Image Upload
const path = require('path');
const fs = require('fs');
const uploadImage = require('../middleware/imageUpload');

// Getting all
router.get('/', async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
    // res.json(User)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})

// Creating one
router.post('/', uploadImage.single("image"), async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    img: {
      data: fs.readFileSync(path.join(__dirname + '/images/account/' + req.body.image, 'public')),
      contentType: 'image/png'
    }
  })
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.email != null) {
    res.user.email = req.body.email
  }
  if (req.body.username != null) {
    res.user.username = req.body.username
  }
  if (req.body.password != null) {
    res.user.password = req.body.password
  }
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: 'Deleted User' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getUser(req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}
module.exports = router