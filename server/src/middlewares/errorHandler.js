

import ApiError from "../utils/ApiError.js";
import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {

    console.log("🔴 ERROR NAME:", err.name);
  console.log("🔴 ERROR MESSAGE:", err.message);
  console.log("🔴 ERROR STACK:", err.stack); 
  // If response already sent, delegate to Express default handler
  if (res.headersSent) {
    return next(err);
  }

  let error = err;

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    error = new ApiError(401, "Invalid token");
  } else if (err.name === "TokenExpiredError") {
    error = new ApiError(401, "Token has expired");
  }

  // Handle Mongoose errors
  else if (err.name === "CastError") {
    error = new ApiError(400, `Invalid ${err.path}: ${err.value}`);
  } else if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {}).join(", ");
    error = new ApiError(409, `Duplicate field value: ${field}`);
  } else if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    error = new ApiError(400, "Validation failed", messages);
  }


  // ✅ Yeh block add karo existing handlers ke baad
else if (!(error instanceof ApiError)) {
  error = new ApiError(
    err.statusCode || 500,
    err.message || err.error?.description || "Internal Server Error"
  );
}

  // Fallback: wrap unknown errors
  else if (!(error instanceof ApiError)) {
    error = new ApiError(
      err.statusCode || 500,
      err.message || "Internal Server Error"
    );
  }

  // Structured logger output
  logger.error({
    method: req.method,
    url: req.originalUrl,
    status: error.statusCode,
    message: error.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors || [],
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;





















/*
==============================================================================
📌 FILE: errorHandler.js

PURPOSE:

Application ka central error handling middleware.

Saare errors yahan aate hain aur yahin se standardized
JSON response bheja jata hai.

==============================================================================

📌 Error Middleware

Normal Middleware:

(req,res,next)

Error Middleware:

(err,req,res,next)

Express 4 parameters dekhkar samajhta hai ki
ye error handler hai.

==============================================================================

📌 error instanceof ApiError

Check karta hai ki error custom ApiError class se bana hai ya nahi.

==============================================================================

📌 Agar ApiError nahi hai

Normal Error ko ApiError me convert kar diya jata hai.

Taaki saare responses same structure follow karein.

==============================================================================

📌 logger.error(...)

Error ko log file me save karta hai.

Example:

GET /api/users/123 - User not found

==============================================================================

📌 res.status(error.statusCode)

HTTP status code set karta hai.

Example:

404
500
401

==============================================================================

📌 success:false

Error response me hamesha false rahega.

==============================================================================

📌 error.errors || []

Additional validation errors bhejne ke liye.

==============================================================================

📌 stack: error.stack

Development mode me stack trace show karta hai.

Production me hide kar diya jata hai.

==============================================================================

📌 Security

Production me stack trace expose nahi karna chahiye.

==============================================================================

📌 FLOW

Request
   ↓
Controller
   ↓
Error
   ↓
asyncHandler
   ↓
next(error)
   ↓
errorHandler
   ↓
logger.error()
   ↓
JSON Response

==============================================================================

📌 Interview Question

Q: Central Error Middleware kyu use karte hain?

Answer:

Application ke saare errors ko ek jagah handle karne,
consistent response bhejne aur logging maintain karne ke liye.

==============================================================================
*/