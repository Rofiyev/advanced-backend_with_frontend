import bcrypt from "bcrypt";
import { UserSchema } from "../models/user.model";
import UserDto from "../dtos/user.dto";
import tokenService from "./token.service";
import mailService from "./mail.service";

class AuthService {
  async register(email: string, password: string) {
    const isExistUser = await UserSchema.findOne({ email: email });

    if (isExistUser)
      throw new Error(`User with existing email ${email} already registered`);

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserSchema.create({
      email,
      password: hashPassword,
    });
    const userDto = new UserDto(user);

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/auth/activation/${userDto.id}`
    );

    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...userDto, ...tokens };
  }

  async activation(userId: string) {
    const user = await UserSchema.findById(userId);

    if (!user) throw new Error("User is not defined!");

    user.isActivated = true;

    await user.save();
  }

  async login(email: string, password: string) {
    const user = await UserSchema.findOne({ email });

    if (!user) throw new Error("User is not defined");

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) throw new Error("Password is incorrect");

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...userDto, ...tokens };
  }

  async logout(refreshToken: string) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw new Error("Bad authorization");

    const userPayload: any = tokenService.validateRefreshToken(refreshToken);
    const tokenDB = await tokenService.findToken(refreshToken);

    if (!userPayload || !tokenDB) throw new Error("Bad authorization");

    const user = await UserSchema.findById(userPayload.id);
    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...userDto, ...tokens };
  }

  async forgotPassword(email: string) {
    const user = await UserSchema.findOne({ email });

    if (!user) throw new Error("User with existing email not found!");

    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });

    await mailService.sendForgotPasswordMail(
      email,
      `${process.env.CLIENT_URL}/recovery-account/${tokens.accessToken}`
    );
  }

  async recoveryAccount(token: string, password: string) {
    const userData: any = tokenService.validateAccessToken(token);

    if (!userData) throw new Error("User not found with token!");

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserSchema.findByIdAndUpdate(userData.id, {
      password: hashPassword,
    });

    return user;
  }
}

export default new AuthService();
