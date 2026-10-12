import { Router } from "express";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokens, verifyAccessToken } from "../utils/auth.utils.js";

const router = Router();

/*
@POST /api/auth/register 
*/
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(400).json({
      message: "User already exist",
      error: {
        field: "email",
        message: "User already exist",
      },
    });
  }
  const user = await userModel.create({
    email,
    name,
    passwordHash: await bcrypt.hash(password, 12),
  });

  const { accessToken, refreshToken } = generateTokens({ userId: user._id });

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  return res.status(201).json({
    message: "User registered successfully",
    data: {
      user: {
        name,
        email,
      },
      accessToken,
    },
  });
});

/* 
@GET /api/auth/me
*/

router.get("/me", async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[ 1 ];

  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized, access token not found",
    });
  }
  const decoded = verifyAccessToken(accessToken);

  if (!decoded) {
    return res.status(401).json({
      message: "Access Token invalid or expired",
    });
  }

  const user = await userModel.findById(decoded.id);

  return res.status(200).json({
    message: "User is valid",
    data: {
      email: user.email,
      name: user.name,
    },
  });
});

export default router;
