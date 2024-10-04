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

export const verifyTokenData = async (token: string, secretKey: string) => {
  try {
    const decode = await jwt.verify(
      token,
      secretKey,
      (err: any, decoded: any) => {
        if (err) {
          throw err;
        } else {
          return decoded;
        }
      }
    );
    return decode;
  } catch (err) {
    throw err;
  }
};
