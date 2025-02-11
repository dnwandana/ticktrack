import { Router } from "express";
import joi from "joi";
import userModel from "../models/user.js";
import argon from "../utils/argon.js";
import jwt from "../utils/jwt.js";

const router = Router();

router.post("/sign-up", async (req, res) => {
  try {
    // request body schema
    const schema = joi.object({
      username: joi.string().required(),
      password: joi.string().required(),
    });

    // validate request body
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    // request body
    const { username, password } = value;

    // check if username already exists
    const user = await userModel.findOne({ username });
    if (user) {
      return res.status(400).json({
        message: "username already exists",
        data: null,
      });
    }

    // create new user record
    const hashedPassword = await argon.hashPassword(password);
    const userPayload = {
      username: username,
      password: hashedPassword,
    };

    await userModel.insert(userPayload);

    return res.status(201).send({
      message: "user created successfully",
      data: null,
    });
  } catch (error) {
    console.log("/sign-up error", error);
    return res.status(500).json({
      message: "something went wrong",
      data: null,
    });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    // request body schema
    const schema = joi.object({
      username: joi.string().required(),
      password: joi.string().required(),
    });

    // validate request body
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    // request body
    const { username, password } = value;

    // check if username exists
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "invalid username or password",
        data: null,
      });
    }

    // check if password is correct
    const isPasswordMatch = await argon.verifyPassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "invalid username or password",
        data: null,
      });
    }

    // generate access and refresh token
    const accessToken = jwt.generateAccessToken({
      id: user.id,
      username: user.username,
    });
    const refreshToken = jwt.generateRefreshToken({ id: user.id });

    return res.json({
      message: "user signed in successfully",
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    });
  } catch (error) {
    console.log("/sign-in error", error);
    return res.status(500).json({
      message: "something went wrong",
      data: null,
    });
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    const { refresh_token } = req.body;

    const accessToken = jwt.refreshAccessToken(refresh_token);

    return res.json({
      message: "OK",
      data: {
        access_token: accessToken,
      },
    });
  } catch (error) {
    console.log("/refresh-token error", error);
    return res.status(500).json({
      message: "something went wrong",
      data: null,
    });
  }
});

export default router;
