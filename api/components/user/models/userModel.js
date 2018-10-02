const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({

        username: {
                type: String,
                required: true
        },
        password: {
                type: String
        },
        platformId: {
                type: String
        },

})

userSchema.methods.hashPassword = function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = function(password, hash){
        return bcrypt.compareSync(password, hash);
}

const User = mongoose.model("User", userSchema);

module.exports = User;