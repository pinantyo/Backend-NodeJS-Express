//Require Mongoose
var mongoose = require('mongoose');
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;
//Define a schema
var Schema = mongoose.Schema;

var user = new Schema(
{
  email: {type: String, required: true, index: { unique: true }},
  password: {type:String, required:true},
  username: { type: String, required: true},
  firstName:{type:String, required:true},
  lastName: {type:String, required:true},
  bio: {type:String},
  age: { type: Number, min: 17, max: 65, required: true },
  registered: { type: Date, default: Date.now() },
  status: { type: Date, default: Date.now() },
})

UserSchema.pre(save, function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model(User, UserSchema);