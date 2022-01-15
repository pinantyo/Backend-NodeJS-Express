//Require Mongoose
const mongoose = require('mongoose');


const roleSchema = new mongoose.Schema(
{
    role:{type:String, required:true},
    users:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Role', roleSchema);