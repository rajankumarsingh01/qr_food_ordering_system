import jwt from "jsonwebtoken";

import Admin from "../models/Admin.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import env from "../config/env.js";

const verifyJWT = asyncHandler(
  async (req, res, next) => {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace(
        "Bearer ",
        ""
      );

    if (!token) {
      throw new ApiError(
        401,
        "Unauthorized request"
      );
    }

    const decodedToken = jwt.verify(
      token,
      env.JWT_SECRET
    );

    const admin = await Admin.findById(
      decodedToken._id
    ).select("-password -refreshToken");

    if (!admin) {
      throw new ApiError(
        401,
        "Invalid access token"
      );
    }

    req.admin = admin;

    next();
  }
);

export default verifyJWT;




















/*
==============================================================================
VERIFY JWT MIDDLEWARE

Purpose:

Protected routes ko secure karna.

FLOW:

Request
   ↓
Get Token
   ↓
Verify JWT
   ↓
Find Admin
   ↓
Attach Admin To req.admin
   ↓
next()

------------------------------------------------------------------------------

1. Token cookie ya Authorization header se nikala jata hai.

2. Agar token nahi mila:

401 Unauthorized

3. jwt.verify() token ki authenticity check karta hai.

4. Token se admin id nikali jati hai.

5. Database me admin search kiya jata hai.

6. Password aur RefreshToken response se hide kiye jate hain.

7. Valid admin milne par:

req.admin = admin

8. next() controller ko execute karta hai.

Security Benefits:

✔ Unauthorized access block
✔ Fake token block
✔ Deleted admin block
✔ Protected routes secure

==============================================================================
*/