const mongoose =  require('mongoose')
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        trim: true,
       
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
  
    createdAt: {
        type: Date,
        default: Date.now
    }
})
UserSchema.pre('save', async function (next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})
module.exports = mongoose.model('User', UserSchema)