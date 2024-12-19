import { Request, Response } from "express";
import { Register, UserRegisterSchema } from "../utils/auth.utils";
import { prisma } from "../../../db/db";
import bcrypt from "bcrypt";
import { generateAuthTokens } from "../utils/generate.token";



export const UserRegisterFunction = async (req: Request, res: Response) => {
    const { name, email, password }: Register = req.body;
    if (!email || !name || !password) {
      console.log("Every field must be filled");
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }
    try {
      const userData = {
        name: name,
        email: email,
        password: password,
      };
      const user = UserRegisterSchema.parse(userData);
      console.log("New User: ", user);
  
      // searching for a similar user
      const existingUser = await prisma.user.findFirst({
        where: {
          name: user.name,
          email: user.email,
        },
      });
      if (existingUser) {
        console.log("User already exists");
        return res.status(409).json({
          success: false,
          msg: "User already exists",
        });
      }
  
      const encryptedPassword = await bcrypt.hash(user.password, 10);
  
      // add user to the database
      const newUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: encryptedPassword,
          isAuthenticated: true,
        },
      });
  
      console.log(
        "New User created and saved in the database, now generating token..."
      );
      await generateAuthTokens(newUser, 200, res);
    } catch (error) {
      console.error("Validation failed: ", error);
      return res.status(500).json({
        success: false,
        msg: "Internal Server Error",
      });
    }
  };