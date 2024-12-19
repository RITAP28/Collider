import {
  accessTokenExpiry,
  accessTokenSecret,
  generateJWT,
  Login,
  refreshTokenSecret,
  Register,
  UserLoginSchema,
  UserRegisterSchema,
} from "../utils/auth.utils";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../../../db/db";
import { generateAuthTokens } from "../utils/generate.token";

const accessExpiry = Date.now() + accessTokenExpiry * 15 * 60 * 1000;

export const UserLoginFunction = async (req: Request, res: Response) => {
  try {
    const { email, password }: Login = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        msg: "Lacking valid authentication credentials",
      });
    }
    const userData = {
      email: email,
      password: password,
    };

    const loggedUser = UserLoginSchema.parse(userData);

    // checking if the user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        email: loggedUser.email,
      },
    });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(
      loggedUser.password,
      existingUser.password
    );
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        msg: "Invalid credentials",
      });
    }

    console.log("Existing user is present, now generating token...");
    await generateAuthTokens(existingUser, 200, res);
  } catch (error) {
    console.error("Login failed: ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const userId = Number(req.query.id);
  if (!refreshToken) {
    return res.status(204).json({
      success: false,
      msg: "No Refresh Token found",
    });
  }
  try {
    const refreshTokenFromDatabase = await prisma.session.findUnique({
      where: {
        userId: userId,
      },
    });
    const decodedRefreshToken = jwt.verify(
      refreshTokenFromDatabase?.refreshToken as string,
      refreshTokenSecret
    ) as { userId: number; name: string; email: string };

    // invalid refresh token or expired
    if (!decodedRefreshToken) {
      return res.status(401).json({
        success: false,
        msg: "Invalid Refresh Token",
      });
    }
    // checking whether the user exists in the database
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: decodedRefreshToken.userId,
        },
      });

      // user does not exist in the database
      if (!user) {
        res.cookie("refreshToken", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        });
        return res.status(404).json({
          success: false,
          msg: "User not found",
        });
      }

      // user exists in the database, then access token is generated.
      console.log("User Id matches, hence the user is authenticated.");
      const accessToken = generateJWT(
        decodedRefreshToken.userId,
        decodedRefreshToken.name,
        decodedRefreshToken.email,
        accessTokenSecret,
        accessExpiry
      );
      console.log(
        `access token refreshed successfully for user with id ${userId}`
      );
      return res.status(200).json({
        success: true,
        accessToken: accessToken,
        msg: `Access Token refreshed successfully, for user with id ${userId}`,
      });
    } catch (error) {
      console.error("Error while checking whether the user exists: ", error);
      return res.status(500).json({
        success: false,
        msg: "Internal Server Error",
      });
    }
  } catch (error) {
    console.error("Error while refreshing access token: ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
