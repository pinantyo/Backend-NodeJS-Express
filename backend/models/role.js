//Require Mongoose
const mongoose = require('mongoose');


const roleSchema = new mongoose.Schema(
{
    role:{type:String, required:true, unique: true},
    users:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    permissions:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }]
})

module.exports = mongoose.model('Role', roleSchema);