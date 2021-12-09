//Require Mongoose
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
{
  authorId:{type:String, required:true},
  jobTitle:{type:String, required:true},
  jobDescription:{type:String},
  jobRequirements:{type:String},
  published:{type: Date, default:Date.now()},
  status: {type: String},
  tags:[Number],
  slug:{type:String, required:true},
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Jobs', jobSchema);