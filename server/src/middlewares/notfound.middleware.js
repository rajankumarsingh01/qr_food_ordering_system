import ApiError from "../utils/ApiError.js";

const notFound = (req, res, next) => {
  next(
    new ApiError(
      404,
      `Route not found: ${req.originalUrl}`
    )
  );
};

export default notFound;












/*
==============================================================================
📌 FILE: notFound.js

PURPOSE:

Application me agar koi requested route exist nahi karta
to 404 error generate karna.

==============================================================================

📌 Middleware

Ye normal Express middleware hai.

(req,res,next)

==============================================================================

📌 req.originalUrl

Current request URL return karta hai.

Example:

/api/users
/api/products
/api/unknown

==============================================================================

📌 new ApiError(404,...)

Custom 404 error object create karta hai.

==============================================================================

📌 next(error)

Error ko Express Error Middleware tak bhejta hai.

next()       → Next Middleware

next(error)  → Error Middleware

==============================================================================

📌 Example

User Request:

GET /api/unknown

Generated Error:

{
   statusCode:404,
   message:"Route not found: /api/unknown"
}

==============================================================================

📌 IMPORTANT

Ye middleware hamesha saare routes ke baad lagaya jata hai.

Example:

app.use("/api/users", userRoutes);

app.use(notFound);

app.use(errorHandler);

==============================================================================

📌 FLOW

Client Request
      ↓
Routes Check
      ↓
Route Not Found
      ↓
notFound Middleware
      ↓
ApiError Create
      ↓
next(error)
      ↓
errorHandler
      ↓
JSON Response

==============================================================================

📌 Interview Question

Q: Not Found Middleware kyu use karte hain?

Answer:

Application me undefined routes ko handle karne aur
consistent 404 response bhejne ke liye.

==============================================================================
*/