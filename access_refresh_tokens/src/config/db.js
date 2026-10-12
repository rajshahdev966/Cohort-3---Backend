import mongoose from "mongoose"

export async function connectDb() {
    await mongoose.connect("mongodb://localhost:27017/access_refresh_token1");
    console.log("Database connected successfully");
}