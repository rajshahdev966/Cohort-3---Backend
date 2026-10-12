const { default: mongoose } = require("mongoose");

const connectDb = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://rajshahdev966_db_user:cohort12345@cohort3-learning.dwkdwm7.mongodb.net/");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error in connecting database", error);
        
    }
}

module.exports = connectDb;