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

jobSchema.pre('save', function(next){
    var job = this;

    if(!job.isModified('jobTitle')) return next();

    var formattedName = job.jobTitle.toLowerCase().split(" ");
      for(var i=0; i < formattedName.length; i++){
      formattedName[i] = formattedName[i][0].toUpperCase() + formattedName[i].substr(1);
    }
  
    job.jobTitle = formattedName.join(" ");
});

module.exports = mongoose.model('Jobs', jobSchema);