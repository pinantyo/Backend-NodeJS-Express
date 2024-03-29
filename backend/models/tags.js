//Require Mongoose
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug)
const tagsSchema = new mongoose.Schema({
  tag:{type:String, required:true},
  slug:{type:String, slug:"tag"},
  jobs:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }]
})

module.exports = mongoose.model('Tags', tagsSchema);