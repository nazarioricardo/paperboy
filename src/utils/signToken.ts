import jwt from "jsonwebtoken";

export const signToken = async (_id: string, email: string) => {
  console.log("signing token", _id, email);
  const token = await jwt.sign(
    {
      _id,
      email,
    },
    "Glorfindel"
  );

  return token;
};
