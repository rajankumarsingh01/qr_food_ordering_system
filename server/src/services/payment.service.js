import env from "../config/env.js";
import Razorpay from "razorpay";

const razorpayInstance = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,       // ← process.env nahi
  key_secret: env.RAZORPAY_KEY_SECRET,
});

export default razorpayInstance;