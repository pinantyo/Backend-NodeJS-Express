//Require Mongoose
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const userDetailsSchema = new mongoose.Schema(
{
    fullname:{type:String, required:true},
    contacts:{type:String, required:true},
    location:{type:String},
    companySize:{type:String},
    slug:{type:String, slug:"fullname"}
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('userDetails', userDetailsSchema);