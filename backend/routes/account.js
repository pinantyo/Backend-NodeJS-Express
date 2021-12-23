require('dotenv').config();
const express = require('express');
const router = express.Router();

// Models
const User = require('../models/user');

// Controllers
const userController = require('../controllers/Account');

// Bcrypt
const bcrypt = require('bcrypt');

// Server Response
const serverResponse = require('../response');

// Json Web Tokens
const jwt = require('jsonwebtoken');

// Image Upload
const path = require('path');
const fs = require('fs');

// Middleware
const uploadImage = require('../middleware/imageUpload');
const auth = require('../middleware/auth');

// Getting all
router.get('/', auth.verifyToken, userController.getAll);
router.get('/:id', auth.verifyToken, userController.getOne);
router.post('/', uploadImage.single("image"), userController.createOne);
router.post('/login', userController.login);
router.patch('/:id', auth.verifyUser, userController.patchOne);
router.delete('/:id', auth.verifyUser, userController.deleteOne);



















// Unite controllers and routes
// router.get('/', auth.verifyToken, async (req, res) => {
//   try {
//     const user = await User.find({});
//     return serverResponse.ok(res, user);
//     // res.json(User)
//   } catch (err) {
//     return serverResponse.error(res, 500, err.message);
//   }
// })

// // Getting One
// router.get('/:id', auth.verifyToken, getUser, (req, res) => {
//   return serverResponse.ok(res, res.user);
// })

// // Creating one
// router.post('/', uploadImage.single("image"), async (req, res) => {
  
//   const requiredFiled = ['email', 'username', 'password'];
  
//   try{
//     requiredFiled.forEach((field) => {
//       if(!req.body[field]){
//         throw new Error(`${field} must not be null`);
//       }
//     });
//   } catch (err) {
//     return serverResponse.error(res, 400, err.message);
//   }
  
//   const user = new User({
//     email: req.body.email.toLowerCase(),
//     username: req.body.username,
//     password: req.body.password,
//     // img: {
//     //   data: fs.readFileSync(path.join(__dirname + '/images/account/' + req.body.image, 'public')),
//     //   contentType: 'image/png'
//     // },
//   })

//   const token = jwt.sign(
//     { user_id: user._id},
//     process.env.TOKEN_KEY,
//     {
//       expiresIn: process.env.SESSION_EXPIRED,
//     }
//   );

//   user.token = token;

//   try {
//     const newUser = await user.save()
//     return serverResponse.ok(res, newUser);
//   } catch (err) {
//     return serverResponse.error(res, 400,err.message);
//   }
// })

// // Login in
// router.post('/login', async (req, res) => {
//   try {
//     const {email, password} = req.body;

//     // Validate 
//     if (!(email && password)) {
//       return serverResponse(res, 400, "All input is required");
//     }

//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       // Create token
//       const token = jwt.sign(
//         { user_id: user._id },
//         process.env.TOKEN_KEY,
//         {
//           expiresIn: "2h",
//         }
//       );

//       // save user token
//       user.token = token;

//       return serverResponse.ok(res, user);
//     }
//     return serverResponse.error(res,400,"Invalid Credentials");
//   } catch (err) {
//     return serverResponse.error(res, 500, err.message);
//   }
// });

// // Updating One
// router.patch('/:id', auth.verifyUser, getUser, async (req, res) => {
//   if (req.body.email != null) {
//     res.user.email = req.body.email
//   }
//   if (req.body.username != null) {
//     res.user.username = req.body.username
//   }
//   if (req.body.password != null) {
//     res.user.password = req.body.password
//   }
//   try {
//     const updatedUser = await res.user.save()
//     return serverResponse.ok(res, updatedUser);
//   } catch (err) {
//     return serverResponse.error(res, 400, err.message);
//   }
// })

// // Deleting One
// router.delete('/:id', auth.verifyUser, getUser, async (req, res) => {
//   try {
//     await res.user.remove()
//     return res.json({ message: 'Deleted User' })
//   } catch (err) {
//     return serverResponse.error(res, 500, err.message);
//   }
// })

// async function getUser(req, res, next){
//   let user
//   try {
//     user = await User.findById(req.params.id)
//     if (user == null) {
//       return res.status(404).json({ message: 'Cannot find user' })
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message })
//   }

//   res.user = user
//   next()
// }
module.exports = router