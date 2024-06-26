const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        require: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        require: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be at least 6 characters long'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

// Encryting password before saving user
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
})

// Compare user Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//  Return JWT
userSchema.methods.getJwtToken = function() {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}
module.exports = mongoose.model('user', userSchema);