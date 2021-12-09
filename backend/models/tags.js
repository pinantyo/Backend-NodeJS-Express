//Require Mongoose
const mongoose = require('mongoose');

const tagsSchema = new mongoose.Schema({
  tag:{type:String, required:true},
  slug:{type:String, required:true},
})

module.exports = mongoose.model('Tags', tagsSchema);