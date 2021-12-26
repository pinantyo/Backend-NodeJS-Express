//Require Mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;
const userSchema = new Schema(
{
    email:{type:String, required:true},
    username:{type: String, unique: true},
    password:{type: String, required: true},
    img:{type: Object},
    token:{type: String},
    role:{type: Schema.Types.ObjectId, ref: "Role"},
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

userSchema.pre('save', function(next){
    var user = this;

    if(!user.isModified('password') || !user.isModified('username')) return next();


    // Pembuatan Salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        // Hashing
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
            // Overwrite password userSchema dengan yang hash
            user.password = hash;
            next();
        })

    })

    var name = user.email.split("@").length==2 ? user.email.split("@")[0].toLowerCase() : null;
    user.username = name.charAt(0).toUpperCase() + name.slice(1);
    next();
});

module.exports = mongoose.model('User', userSchema);