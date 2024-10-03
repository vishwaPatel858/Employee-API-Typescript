const jwt = require("jsonwebtoken");
import { redisClient } from "../Utility/redisClient.ts";
export const generateAccessToken = async (id: string) => {
  const accessToken = await jwt.sign(
    { id: id },
    process.env.JWT_Access_SECRET,
    {
      expiresIn: 3600,
    }
  );
  redisClient.set(accessToken, id);
  return accessToken;
};

export const generateRefreshToken = async (id: string) => {
  const refreshToken = await jwt.sign(
    { id: id },
    process.env.JWT_Refresh_SECRET,
    {
      expiresIn: 86400,
    }
  );
  redisClient.set(refreshToken, id);
  return refreshToken;
};
