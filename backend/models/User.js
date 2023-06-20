const mongoose = require('mongoose')
// const {Schema}=  mongoose

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
UserSchema.index()
const User = mongoose.model("user", UserSchema)
//   User.createIndex({"name":1},{unique:true});
module.exports = User;