import jwt from "jsonwebtoken";

import Admin from "../models/Admin.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import env from "../config/env.js";

import {
  generateAccessAndRefreshTokens,
} from "../utils/token.utils.js";




import bcrypt from "bcryptjs";


// ✅ Naya
const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "none" : "strict",
};


const loginAdmin = asyncHandler(
  async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(
        400,
        "Email and password are required"
      )
    }

    const admin = await Admin.findOne({
      email,
    }).select("+password +refreshToken");

    if (!admin) {
      throw new ApiError(
        401,
        "Invalid email or password"
      )
    }

    const isPasswordvalid = await admin.comparePassword(
      password
    );

    if (!isPasswordvalid) {
      throw new ApiError(
        401,
        "Invalid email or password"
      )
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin._id);


    const loggedInAdmin =
      await Admin.findById(admin._id).select("-password -refreshToken");

    return res.status(200).cookie(
      "accessToken",
      accessToken,
      cookieOptions
    )
      .cookie(
        "refreshToken",
        refreshToken,
        cookieOptions
      ).json(
        new ApiResponse(
          200,
          {
            admin: loggedInAdmin,
            accessToken,
            refreshToken,
          },
          "Login Successfully"
        )
      )

  }
)





const logoutAdmin = asyncHandler(
  async (req, res) => {
    await Admin.findByIdAndUpdate(
      req.admin._id,
      {
        $unset: {
          refreshToken: 1,
        }
      }
    );

    return res.status(200).clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json(
        new ApiResponse(
          200,
          {},
          "Logout Successfully"
        )
      );
  }
)



// down below code work properly
// const refreshAccessToken =
//   asyncHandler(
//     async (req, res) => {
//       const incomingRefreshToken =
//         req.cookies?.refreshToken ||
//         req.body.refreshToken;

//       if (
//         !incomingRefreshToken
//       ) {
//         throw new ApiError(
//           401,
//           "Refresh token required"
//         );
//       }

//       const decodedToken =
//         jwt.verify(
//           incomingRefreshToken,
//           env.JWT_REFRESH_SECRET
//         );

//       const admin =
//         await Admin.findById(
//           decodedToken._id
//         ).select(
//           "+refreshToken"
//         );

//       if (!admin) {
//         throw new ApiError(
//           401,
//           "Invalid refresh token"
//         );
//       }

//       if (
//         incomingRefreshToken !==
//         admin.refreshToken
//       ) {
//         throw new ApiError(
//           401,
//           "Refresh token expired"
//         );
//       }

//       const {
//         accessToken,
//         refreshToken,
//       } =
//         await generateAccessAndRefreshTokens(
//           admin._id
//         );

//       return res
//         .status(200)
//         .cookie(
//           "accessToken",
//           accessToken,
//           cookieOptions
//         )
//         .cookie(
//           "refreshToken",
//           refreshToken,
//           cookieOptions
//         )
//         .json(
//           new ApiResponse(
//             200,
//             {
//               accessToken,
//               refreshToken,
//             },
//             "Access token refreshed"
//           )
//         );
//     }
//   );

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token required");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      env.JWT_REFRESH_SECRET
    );
  } catch (err) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  // pehle ye tha — try-catch ke bina:
  // const decodedToken = jwt.verify(incomingRefreshToken, env.JWT_REFRESH_SECRET);

  const admin = await Admin.findById(decodedToken._id)
    .select("+refreshToken");

  if (!admin) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (incomingRefreshToken !== admin.refreshToken) {
    throw new ApiError(401, "Refresh token expired or already used");
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(admin._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed"));
});






const getCurrentAdmin =
  asyncHandler(
    async (req, res) => {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            req.admin,
            "Admin profile fetched"
          )
        );
    }
  );




// remove this in production - only for testing/demo purposes
// ✅ Fixed seedAdmin
const seedAdmin = asyncHandler(async (req, res) => {
  const existingAdmin = await Admin.findOne({ email: "admin@qrfood.com" });

  if (existingAdmin) {
    return res.status(200).json(
      new ApiResponse(200, existingAdmin, "Admin already exists")
    );
  }

  const admin = await Admin.create({
    name: "Super Admin",
    email: "admin@qrfood.com",
    password: "Admin@123",        // ✅ plain text — pre("save") hook hashes it
    restaurantName: "QR Food Demo",
  });

  return res.status(201).json(
    new ApiResponse(201, admin, "Admin created successfully")
  );
});



export { loginAdmin, logoutAdmin, refreshAccessToken, getCurrentAdmin, seedAdmin };

