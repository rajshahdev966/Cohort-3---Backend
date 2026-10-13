import {Router} from "express"
import userModel from "../../../../access_refresh_tokens/src/models/user.model.js";
import bcrypt from "bcryptjs"
import userModdel from "../models/auth.models.js";
import { generateToken, verifyAcessToken } from "../utils/auth.utils.js";

const routes = Router();

/* 
    POST /api/auth/register
*/

routes.post("/register", async (req, res)=> {
    const {email, name, password} = req.body;

    const isUserExist = await userModel.findOne({email});

    if(isUserExist){
        return res.status(400).json({
            message: "User already exist",
            error: {
                field: "email",
                message: "User already exist"
            }
        })
    }

    const user = await userModel.create({
        name, email, passwordHash: await bcrypt.hash(password, 12)
    }) 


    const {accessToken, refreshToken } = generateToken({userId: user._id});

    user.refreshToken = refreshToken;
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    })
    await user.save();


    return res.status(200).json({
        message: "User register successfully",
        data: {
            user: {
                name,
                email
            },
            accessToken
        }
    })
})

routes.get("/me", async (req,res)=> {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    const decoded = verifyAcessToken(accessToken)
    
    if(!decoded){
        return res.status(404).json({
            message: "Invalid or Wrong Acess Token",
            error: {
                field: "access-token",
                message: "Invalid or Wrong Token"
            }
        })
    }

    const user = await userModdel.findById(decoded.userId || decoded.id);

    if(!user){
        return res.status(404).json({
            message: "User not found",
            error: {
                field: "user",
                message: "User not found"
            }
        });
    }

    return res.status(200).json({
        message: "User got sucessfully",
        data: {
            user: {
                email: user.email,
                name: user.name
            }
        }
    })
})

export default routes;