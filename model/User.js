const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        maxLength: 160,
        required: true,
        unique:true,
    },
    Fname: {
        type: String,
        maxLength: 160,
        required: true,
    },
    Lname: {
        type: String,
        maxLength: 160,
        required: true,
    },
    password: {
        type: String,
        maxLength: 256,
        required: true
    },
    email: {
        type: String,
        required:true,
    },
    dob: Date,
    followers: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
},
{
    toJSON: {
        transform: (doc, ret, options) => {
            delete ret.password;
            return ret;
        }
    }
},);

userSchema.pre('save', function preSave(next) {
    this.password = bcrypt.hashSync(this.password, 8);
    next();
  });

userSchema.pre('findOneAndUpdate', function (next) {
    if (this._update.password)
        this._update.password = bcrypt.hashSync(this._update.password, 8);
    next();
  })

userSchema.methods.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;

