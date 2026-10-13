import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        minLength: 3,
        maxLength: 50,
        type: String,
    },
    email: {
        required: true,
        type: String,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        unique: true,
    }, 
    passwordHash: {
        required: true,
        type: String,
    }

}) 

const userModdel = mongoose.model("user", userSchema);

export default userModdel;