import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Admin name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    restaurantName: {
      type: String,
      required: [true, "Restaurant name is required"],
      trim: true,
      maxlength: 100,
    },

    refreshToken: {
      type: String,
      default: null,
      select: false,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Fixed - regular function, 'this' correctly refers to the document
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});


adminSchema.methods.comparePassword =
  async function (password) {
    return await bcrypt.compare(
      password,
      this.password
    );
  };

adminSchema.methods.generateAccessToken =
  function () {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        restaurantName:
          this.restaurantName,
      },
      env.JWT_SECRET,
      {
        expiresIn: env.JWT_EXPIRE,
      }
    );
  };

adminSchema.methods.generateRefreshToken =
  function () {
    return jwt.sign(
      {
        _id: this._id,
      },
      env.JWT_REFRESH_SECRET,
      {
        expiresIn:
          env.JWT_REFRESH_EXPIRE,
      }
    );
  };

const Admin = mongoose.model(
  "Admin",
  adminSchema
);

export default Admin;





















/*
==============================================================================
ADMIN MODEL SUMMARY

1. Admin ka MongoDB schema define karta hai.

2. Password database me plain text me save nahi hota.
   bcrypt se hash hota hai.

3. pre("save") middleware save hone se pehle password hash karta hai.

4. comparePassword() login ke time entered password aur hashed password compare karta hai.

5. generateAccessToken() short-lived JWT token banata hai.
   Is token se protected APIs access hoti hain.

6. generateRefreshToken() long-lived token banata hai.
   Access token expire hone par naya access token generate karne ke liye.

7. select:false password aur refreshToken ko normal queries se hide karta hai.

8. timestamps:true automatically createdAt aur updatedAt add karta hai.

FLOW:

Register
 ↓
Password Hash
 ↓
Save User

Login
 ↓
Compare Password
 ↓
Generate Access Token
 ↓
Generate Refresh Token
 ↓
Send Tokens

Protected Route
 ↓
Access Token Verify
 ↓
Allow Access

Access Token Expired
 ↓
Refresh Token Verify
 ↓
Generate New Access Token
==============================================================================
*/