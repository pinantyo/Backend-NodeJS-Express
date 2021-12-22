//Require Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registSchema = new Schema(
{
    jobsId:{type: Schema.Types.ObjectId, required:true, ref: "Jobs"},
    candidateId:{type: Schema.Types.ObjectId, required:true, ref: "User"},
    statusId:{type: Schema.Types.ObjectId, ref: "Status"},
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Registration', registSchema);