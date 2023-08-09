import jwt from "jsonwebtoken";

export const signToken = async (userId: string, email: string) => {
  const token = await jwt.sign(
    {
      id: userId,
      email,
    },
    "Glorfindel"
  );

  return token;
};
