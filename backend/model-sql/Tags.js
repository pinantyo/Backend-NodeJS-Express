//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var topics = new Schema(
{
  tag:{type:String, required:true},
  slug:{type:String, required:true},
  meta: {type:String, required:true},
})

module.exports = mongoose.model(Tags, UserSchema);