const express = require('express');
const router = express.Router();


// Models
const User = require('../models/user');
const userDetail = require('../models/userDetails');


// Route
router.get('/:slug/:id', getUserDetails, (req, res) => {
  res.json(res.userInformation);
})

// Creating one
router.post('/:slug/:id', getUser, async (req, res, next) => {
  const user = new userDetail({
    account_id:res.userInformation._id,
    fullname:req.body.fullname,
    contacts:req.body.contacts,
    location:req.body.location,
    companySize:req.body.companySize,
  });
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:slug/:id', getUserDetails, async (req, res) => {
  if (req.body.fullname != null) {
    res.userInformation.fullname = req.body.fullname;
  }
  if (req.body.contacts != null) {
    res.userInformation.contacts = req.body.contacts;
  }
  if (req.body.location != null) {
    res.userInformation.location = req.body.location;
  }
  if (req.body.companySize != null) {
    res.userInformation.companySize = req.body.companySize;
  }
  try {
    const updatedUser = await res.userInformation.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

// Deleting One
router.delete('/:id', getUserDetails, async (req, res) => {
  try {
    await res.userInformation.remove()
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

  res.userInformation = user
  next()
}

async function getUserDetails(req, res, next) {
  let userInformation;
  try {
    userInformation = await User.find({}, {projection: {account_id:req.params.id}})
    if (userInformation == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.userInformation = userInformation
  next()
}
module.exports = router