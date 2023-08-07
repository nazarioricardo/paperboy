import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { IUser, IUserLogin } from "../types";

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
          user_id: user._id,
          email,
        },
        "Glorfindel"
      );

      return res.status(200).json({
        token,
        user: { user_name: user.user_name, role: user.role },
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
  const { user_name, email, password, role }: IUser = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userObj = new User({
      user_name,
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
