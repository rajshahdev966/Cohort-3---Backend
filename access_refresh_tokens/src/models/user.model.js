import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minlength: 3,
        maxlength: 50,
    },
    email:{
        required: true,
        type: String,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        unique: true
    },
    passwordHash: {
        required: true,
        type: String,
    }
})

const userModel = mongoose.model("user", userSchema);

export default userModel;