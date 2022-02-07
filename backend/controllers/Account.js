require('dotenv').config();

// Google Authentication
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

// Models
const User = require('../models/user');
const userDetail = require('../models/userDetails');

// Bcrypt
const bcrypt = require('bcrypt');

// Server Response
const serverResponse = require('../response');

// Json Web Tokens
const jwt = require('jsonwebtoken');

// Image
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink)

// Getting all
const getAll = async (req, res) => {
  try {
    const user = await User.find({});
    if(user.length == 0){
      serverResponse.error(res, 404, 'Not Found');
      return;
    }
    serverResponse.ok(res, user);
    return;
  } catch (err) {
    serverResponse.error(res, 500, err.message);
    return;
  }
}

// Getting One
const getOne = async (req, res) => {
  user = await getUser(req, res);
  serverResponse.ok(res, user);
  return;
}

// Creating one
const createOne = async (req, res) => {
  const user = new User({
    email: req.body.email.toLowerCase(),
    username: req.body.username,
    password: req.body.password,
  });

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
    serverResponse.ok(res, newUser);
    return;
  } catch (err) {
    serverResponse.error(res, 400,err.message);
    return;
  }
}

// Login in
const login = async (req, res) => {
  try {
    const {email, password} = req.body;
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
      serverResponse.ok(res, user);
      return;
    }
    serverResponse.error(res,400,"Invalid Credentials");
    return;
  } catch (err) {
    serverResponse.error(res, 500, err.message);
    return;
  }
};

const loginGoogle = async (req, res) => {
  try{
      const { token }  = req.body
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.CLIENT_ID
      });
      const { name, email, picture } = ticket.getPayload();    
      console.log(`${name} - ${email}`);
      serverResponse.ok(res, email);
      return;
    } catch(err){
      serverResponse.error(res, 500, err.message);
      return;
    }
}

// Updating One
const patchOne = async (req, res) => {
  user = await getUser(req, res);
	field = ['email', 'username', 'password'];
	field.forEach((field) => {
		if(req.body[field]){
			user[field] = req.body[field];
		}
	});
  
  // Single IMG
  if(req.file){
    if(user.img){
      await unlinkAsync(user.img.path);
    }
    user.img = req.file;
  }

  // Multiple IMG
  // if(req.files){
  //   if(user.img){
  //     for(const item of user.img){
  //       await unlinkAsync(item.path);
  //     }
  //   }
  //   user.img = req.files;
  // }
  
  try {
    const updatedUser = await user.save();
    serverResponse.ok(res, updatedUser);
    return;
  } catch (err) {
    serverResponse.error(res, 400, err.message);
    return;
  }
}

// Deleting One
const deleteOne = async (req, res) => {
	user = await getUser(req, res);

  // Single IMG
  if(user.img){
    await unlinkAsync(user.img.path);
  }

  // Multiple IMG
  // for(const item of user.img){
  //   await unlinkAsync(item.path);
  // }

  try {
    await user.remove();
    return res.json({ message: 'Deleted User' });
  } catch (err) {
    serverResponse.error(res, 500, err.message);
    return;
  }
}


// Account Details

// Route
const getDetails = async (req, res) => {
  const userInformation = await getUserDetails(req, res);
  serverResponse.ok(res, userInformation);
  return;
};


// Creating one
const postDetails = async (req, res) => {
  const requiredFiled = ['fullname','contacts','location'];
  try{
    requiredFiled.forEach((field)=>{
      if(!req.body[field]){
        throw new Error(`${field} must not be null`);
      }
    });
  } catch(err){
    serverResponse.error(res, 500, err.message);
    return;
  }

  var formattedName = req.body.fullname.toLowerCase().split(" ");
  for(var i=0; i < formattedName.length; i++){
    formattedName[i] = formattedName[i][0].toUpperCase() + formattedName[i].substr(1);
  }
  
  formattedName = formattedName.join(" ");

  const user = new userDetail({
    account_id:req.params.id,
    fullname:formattedName,
    contacts:req.body.contacts,
    location:req.body.location,
    companySize:req.body.companySize,
  });
  try {
    const newUser = await user.save()
    serverResponse.ok(res, newUser);
    return;
  } catch (err) {
    serverResponse.error(res, 400, err.message);
    return;
  }
};

// Updating One
const patchDetails = async (req, res) => {
  let userInformation;
  try{
    userInformation = await getUserDetails(req, res);
  } catch (err) {
    serverResponse.error(res, 404, err.message);
    return;
  }
  
  field = ['fullname','contacts','location','companySize'];
  field.forEach((field) => {
    if (req.body[field]) {
      userInformation[field] = req.body[field];
    }
  });
  

  try {
    const updatedUser = await userInformation.save();
    serverResponse.ok(res, updatedUser);
    return;
  } catch (err) {
    serverResponse.error(res, 400, err.message);
    return;
  }
};

// Deleting One
const deleteDetails = async (req, res) => {
  let userInformation;
  try{
    userInformation = await getUserDetails(req, res);
  } catch (err) {
    serverResponse.error(res, 404, err.message);
    return;
  }

  try {
    await userInformation.remove()
    return res.json({ message: 'Deleted User' })
  } catch (err) {
    serverResponse.error(res, 500, err.message);
    return;
  }
};

async function getUser(req, res){
  let user
  try {
    user = await User.findById(req.params.id)
    if (user.length == 0) {
      serverResponse.error(res, 404, "Not Found");
      return;
    }
  } catch (err) {
    serverResponse.error(res, 500, err.message);
    return;
  }
  return user;
}

async function getUserDetails(req, res) {
  let userInformation;
  try {
    userInformation = await userDetail.findOne({account_id:req.params.id}).populate({path:'account_id',});
    if (userInformation == null) {
      serverResponse.error(res, 404, 'Not Found');
      return;
    }
  } catch (err) {
    serverResponse.error(res, 500, err.message);
    return;
  }

  return userInformation;
};

module.exports = {getAll, getOne, createOne, login, loginGoogle, patchOne, deleteOne, getDetails, postDetails, patchDetails, deleteDetails};