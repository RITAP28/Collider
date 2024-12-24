import { Request, Response } from "express";
import { prisma } from "../../../db/db";

export const UserLogoutFunction = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.query.id);
      if (!userId) {
        return res.status(400).json({
          success: false,
          msg: "User ID is required",
        });
      }
      if (isNaN(userId)) {
        return res.status(400).json({
          success: false,
          msg: "User ID must be a valid Number",
        });
      }
      await prisma.session.delete({
        where: {
          userId: userId,
        },
      });
      res.cookie("refreshToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      return res.status(200).json({
        success: false,
        msg: `User with ID ${userId} logged out successfully`,
      });
    } catch (error) {
      console.error("Error while logging out: ", error);
      return res.status(500).json({
        success: false,
        msg: "Internal Server Error",
      });
    };
  };