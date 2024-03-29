//Require Mongoose
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const jobSchema = new Schema(
{
  authorId:{type:Schema.Types.ObjectId, required:true, ref: "User"},
  jobTitle:{type:String, required:true},
  jobDescription:{type:String},
  jobRequirements:{type:String},
  published:{type: Date, default:Date.now()},
  status: {type:Schema.Types.ObjectId, ref:"Status"},
  tags:[{
    type: Schema.Types.ObjectId, 
    ref: "Tags",
  }],
  slug:{type:String, slug:"jobTitle"},
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

jobSchema.index({jobTitle: 'text', authorId: 'text'});

jobSchema.pre('save', function(next){
    var job = this;
    if(!job.isModified('jobTitle')) return next();
    job.jobTitle = job.jobTitle.toUpperCase();
    next();
});

module.exports = mongoose.model('Jobs', jobSchema);