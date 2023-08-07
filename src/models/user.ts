import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types";
import { Document } from "mongoose";

type IUserDocument = IUser & Document;
interface IUserModel extends IUserDocument {
  comparePassword: (
    candidatePassword: string,
    cb: (arg: any, isMatch?: boolean) => void
  ) => void;
}

const userSchema = new Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  const user = this as any;

  if (!user.isModified("password")) {
    return next();
  }

  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;
      next();
    } catch (error) {
      // next(error);
      throw error;
    }
  }
});
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
  cb: (arg: any, isMatch?: boolean) => void
) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

const User = model<IUserModel>("User", userSchema);

export default User;
