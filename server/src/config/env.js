import "dotenv/config"; // ← pehli line
const env = {
  PORT: process.env.PORT || 5000,

  NODE_ENV:
    process.env.NODE_ENV || "development",

  MONGO_URI:
    process.env.MONGO_URI,

  REDIS_URL:
    process.env.REDIS_URL,

  JWT_SECRET:
    process.env.JWT_SECRET,

  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET,

  JWT_EXPIRE:
    process.env.JWT_EXPIRE,

  JWT_REFRESH_EXPIRE:
    process.env.JWT_REFRESH_EXPIRE,

  CLOUDINARY_CLOUD_NAME:
    process.env.CLOUDINARY_CLOUD_NAME,

  CLOUDINARY_API_KEY:
    process.env.CLOUDINARY_API_KEY,

  CLOUDINARY_API_SECRET:
    process.env.CLOUDINARY_API_SECRET,

  RAZORPAY_KEY_ID:
    process.env.RAZORPAY_KEY_ID,

  RAZORPAY_KEY_SECRET:
    process.env.RAZORPAY_KEY_SECRET,

  CLIENT_URL:
    process.env.CLIENT_URL,

  RESEND_API_KEY: process.env.RESEND_API_KEY,
  FROM_EMAIL: process.env.FROM_EMAIL,

  GEMINI_API_KEY: process.env.GEMINI_API_KEY,

  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
};

export default env;