const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export default asyncHandler;















/*
==============================================================================
📌 FILE: asyncHandler.js

PURPOSE:

Express async controllers ke errors automatically catch karne ke liye.

Without asyncHandler:

Har controller me:

try {
   ...
}
catch(error){
   next(error);
}

likhna padta.

asyncHandler ye kaam automatically karta hai.

==============================================================================

📌 asyncHandler(requestHandler)

requestHandler = controller function

Example:

asyncHandler(getUser)

Yahan:

requestHandler = getUser

==============================================================================

📌 return (req,res,next)=>{}

Express ko ek normal middleware return karta hai.

Express middleware format:

(req,res,next)=>{}

==============================================================================

📌 Promise.resolve()

Controller ko execute karta hai.

Example:

requestHandler(req,res,next)

Aur ensure karta hai ki result Promise ho.

==============================================================================

📌 .catch(next)

Agar controller ke andar koi error aaye:

throw new Error(...)
throw new ApiError(...)

To error automatically catch ho jayega.

==============================================================================

📌 next(error)

Error ko Express Error Middleware tak bhejta hai.

==============================================================================

📌 FLOW

Request
   ↓
Route
   ↓
asyncHandler
   ↓
Controller
   ↓
Error
   ↓
.catch(next)
   ↓
Error Middleware
   ↓
JSON Response

==============================================================================

📌 BENEFIT

Controller clean rehte hain.

Business logic aur error handling separate ho jati hai.

==============================================================================

📌 INTERVIEW QUESTION

Q: asyncHandler kyu use karte hain?

Answer:

Async controller functions ke errors ko automatically
catch karke Express error middleware tak forward karne
ke liye, taaki har controller me try-catch na likhna pade.

==============================================================================
*/