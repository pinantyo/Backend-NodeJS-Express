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
      return serverResponse.error(res, 404, 'Not Found');
    }
    return serverResponse.ok(res, user);
  } catch (err) {
    return serverResponse.error(res, 500, err.message);
  }
}

// Getting One
const getOne = async (req, res) => {
  user = await getUser(req, res);
  return serverResponse.ok(res, user);
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
    return serverResponse.ok(res, newUser);
  } catch (err) {
    return serverResponse.error(res, 400,err.message);
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
      return serverResponse.ok(res, user);
    }
    return serverResponse.error(res,400,"Invalid Credentials");
  } catch (err) {
    return serverResponse.error(res, 500, err.message);
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
      return serverResponse.ok(res, email);
    } catch(err){
      return serverResponse.error(res, 500, err.message);
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
    return serverResponse.ok(res, updatedUser);
  } catch (err) {
    return serverResponse.error(res, 400, err.message);
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
    return serverResponse.error(res, 500, err.message);
  }
}


// Account Details

// Route
const getDetails = async (req, res) => {
  const userInformation = await getUserDetails(req, res);
  return serverResponse.ok(res, userInformation);
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
    return serverResponse.error(res, 500, err.message);
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
    return serverResponse.ok(res, newUser);
  } catch (err) {
    return serverResponse.error(res, 400, err.message);
  }
};

// Updating One
const patchDetails = async (req, res) => {
  let userInformation;
  try{
    userInformation = await getUserDetails(req, res);
  } catch (err) {
    return serverResponse.error(res, 404, err.message);
  }
  
  field = ['fullname','contacts','location','companySize'];
  field.forEach((field) => {
    if (req.body[field]) {
      userInformation[field] = req.body[field];
    }
  });
  

  try {
    const updatedUser = await userInformation.save();
    return serverResponse.ok(res, updatedUser);
  } catch (err) {
    return serverResponse.error(res, 400, err.message);
  }
};

// Deleting One
const deleteDetails = async (req, res) => {
  let userInformation;
  try{
    userInformation = await getUserDetails(req, res);
  } catch (err) {
    return serverResponse.error(res, 404, err.message);
  }

  try {
    await userInformation.remove()
    return res.json({ message: 'Deleted User' })
  } catch (err) {
    return serverResponse.error(res, 500, err.message);
  }
};

async function getUser(req, res){
  let user
  try {
    user = await User.findById(req.params.id)
    if (user.length == 0) {
      return serverResponse.error(res, 404, "Not Found");
    }
  } catch (err) {
    return serverResponse.error(res, 500, err.message);
  }
  return user;
}

async function getUserDetails(req, res) {
  let userInformation;
  try {
    userInformation = await userDetail.findOne({account_id:req.params.id}).populate({path:'account_id',});
    if (userInformation == null) {
      return serverResponse.error(res, 404, 'Not Found');
    }
  } catch (err) {
    return serverResponse.error(res, 500, err.message);
  }

  return userInformation;
};

module.exports = {getAll, getOne, createOne, login, loginGoogle, patchOne, deleteOne, getDetails, postDetails, patchDetails, deleteDetails};