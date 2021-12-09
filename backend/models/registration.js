//Require Mongoose
const mongoose = require('mongoose');


const registSchema = new mongoose.Schema(
{
    candidateId:{type:String, required:true},
    statusId:{type:String, required:true},
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Registration', registSchema);