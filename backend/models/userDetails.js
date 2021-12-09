//Require Mongoose
const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema(
{
    fullname:{type:String, required:true},
    contacts:{type:String, required:true},
    location:{type:String},
    companySize:{type:String},
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('userDetails', userDetailsSchema);