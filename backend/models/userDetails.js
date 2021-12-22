//Require Mongoose
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const userDetailsSchema = new Schema(
{
    account_id:{type: Schema.Types.ObjectId, required:true, ref: "User"},
    fullname:{type:String, required:true},
    contacts:{type:String, required:true},
    location:{type:String},
    companySize:{type:String},
    slug:{type:String, slug:"fullname"}
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('userDetails', userDetailsSchema);