import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { IUser, IUserLogin } from "../utils/types";

/**
 * @param {Request} req
 * @param {Response} res
 */
export const login = async (req: Request, res: Response) => {
  const { email, password }: IUserLogin = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.comparePassword(password, async (err: any, isMatch?: boolean) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: "Password is invalid" });
      }

      const token = await jwt.sign(
        {
          id: user._id,
          email,
        },
        "Glorfindel"
      );

      return res.status(200).json({
        token,
        user: { username: user.username, role: user.role },
      });
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
export const register = async (req: Request, res: Response) => {
  const { username, email, password, role }: IUser = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userObj = new User({
      username,
      email,
      password,
      role,
    });

    await userObj.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

export const profile = async (req: Request, res: Response) => {
  const { id } = req.body.user;
  try {
    const userObj = await User.findOne({ _id: id });
    if (!userObj) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: userObj });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
