import Admin from "../models/Admin.model.js";
import ApiError from "./ApiError.js";

export const generateAccessAndRefreshTokens = async (adminId) => {
  const admin = await Admin.findById(adminId);

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  const accessToken = admin.generateAccessToken();
  const refreshToken = admin.generateRefreshToken();

  admin.refreshToken = refreshToken;

  await admin.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};