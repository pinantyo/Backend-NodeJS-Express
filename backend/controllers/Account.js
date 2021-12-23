require('dotenv').config();
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

// Getting all
const getAll = async (req, res) => {
  try {
    const user = await User.find({});
    return serverResponse.ok(res, user);
    // res.json(User)
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
  
  const requiredFiled = ['email', 'username', 'password'];
  
  try{
    requiredFiled.forEach((field) => {
      if(!req.body[field]){
        throw new Error(`${field} must not be null`);
      }
    });
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
    return serverResponse.ok(res, newUser);
  } catch (err) {
    return serverResponse.error(res, 400,err.message);
  }
}

// Login in
const login = async (req, res) => {
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
    return serverResponse.error(res, 500, err.message);
  }
};

// Updating One
const patchOne = async (req, res) => {
	user = await getUser(req, res);
	field = ['email', 'username', 'password'];
	field.forEach((field) => {
		if(req.body[field]){
			user[field] = req.body[field];
		}
	});
  	
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
  	try {
    	await user.remove();
    	return res.json({ message: 'Deleted User' });
  	} catch (err) {
	    return serverResponse.error(res, 500, err.message);
  	}
}

async function getUser(req, res){
  let user
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  return user;
}

module.exports = {getAll, getOne, createOne, login, patchOne, deleteOne};