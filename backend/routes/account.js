require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Bcrypt
const bcrypt = require('bcrypt');

// Server Response
const serverResponse = require('../response');

// Json Web Tokens
const jwt = require('jsonwebtoken');

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
  
  const requiredFiled = ['email', 'username', 'password'];
  
  try{
    requiredFiled.forEach((field) => {
      if(!req.body[field]){
        throw new Error(`${field} must not be null`);
      }
    })
  } catch (err) {
    return serverResponse.error(res, 400, err.message);
  }
  
  const user = new User({
    email: req.body.email.toLowerCase(),
    username: req.body.username,
    password: req.body.password,
    // img: {
    //   data: fs.readFileSync(path.join(__dirname + '/images/account/' + req.body.image, 'public')),
    //   contentType: 'image/png'
    // },
  })

  const token = jwt.sign(
    { user_id: user._id},
    process.env.TOKEN_KEY,
    {
      expiresIn: process.env.SESSION_EXPIRED,
    }
  );

  user.token = token;

  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Login in
router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;

    // Validate 
    if (!(email && password)) {
      return serverResponse(res, 400, "All input is required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      return serverResponse.ok(res, user);
    }
    return serverResponse.error(res,400,"Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

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