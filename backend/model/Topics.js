//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var topics = new Schema(
{
  authorId:{type:String},
  title:{type:String, required:true},
  slug:{type:String, required:true},
  published:{type: Date, default:Date.now()},
  status: {type: String, default:},
  content: {type: String, required:true},
  tags:[Number],
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model(Topics, UserSchema);