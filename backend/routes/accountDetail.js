const express = require('express');
const router = express.Router();

// Server Response
const serverResponse = require('../response');

// Models
const User = require('../models/user');
const userDetail = require('../models/userDetails');

// Middleware
const auth = require('../middleware/auth');

// Route
router.get('/:id', auth.verifyToken, getUserDetails, (req, res) => {
  return serverResponse.ok(res, res.userInformation);
});


// Creating one
router.post('/:id', auth.verifyUser, getUser, async (req, res) => {

  const requiredFiled = ['fullname','contacts'];

  try{
    requiredFiled.forEach((field)=>{
      if(!req.body[field]){
        throw new Error(`${field} must not be null`);
      }
    });
  } catch(err){
    return serverResponse.error(res, 500, err.message);
  }

  const user = new userDetail({
    account_id:req.params.id,
    fullname:req.body.fullname,
    contacts:req.body.contacts,
    location:req.body.location,
    companySize:req.body.companySize,
  });
  try {
    const newUser = await user.save()
    return serverResponse.ok(res, newUser);
  } catch (err) {
    return serverResponse.error(res, 400, err.message);
  }
});

// Updating One
router.patch('/:id', auth.verifyUser, getUserDetails, async (req, res) => {
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
    return serverResponse.ok(res, updatedUser);
  } catch (err) {
    return serverResponse.error(res, 400, err.message);
  }
});

// Deleting One
router.delete('/:id', auth.verifyUser, getUserDetails, async (req, res) => {
  try {
    await res.userInformation.remove()
    return res.json({ message: 'Deleted User' })
  } catch (err) {
    return serverResponse.error(res, 500, err.message);
  }
});


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
};

async function getUserDetails(req, res, next) {
  let userInformation;
  try {
    userInformation = await userDetail.findOne({account_id:req.params.id}).populate({
      path:'account_id',
    });
    if (userInformation == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.userInformation = userInformation
  next()
};

module.exports = router