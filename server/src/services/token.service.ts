import jwt from "jsonwebtoken";
import { TokenSchema } from "../models/token.model";
import { ObjectId } from "mongoose";

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY!, {
      expiresIn: "2days",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY!, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }

  async saveToken(userId: ObjectId, refreshToken: string) {
    const isExistToken = await TokenSchema.findOne({ user: userId });

    if (isExistToken) {
      isExistToken.refreshToken = refreshToken;
      return await isExistToken.save();
    }

    await TokenSchema.create({ user: userId, refreshToken });
  }

  async removeToken(refreshToken: string) {
    return await TokenSchema.findOneAndDelete({ refreshToken });
  }

  async findToken(refreshToken: string) {
    return await TokenSchema.findOne({ refreshToken });
  }

  validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_KEY);
    } catch (error) {
      return null;
    }
  }

  validateAccessToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_KEY);
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
