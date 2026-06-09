class ApiError extends Error {
  constructor(
    statusCode,
    message = "Internal Server Error",
    errors = []
  ) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.success = false;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;










/*
==============================================================================
📌 FILE: ApiError.js

🎯 PURPOSE:
Yeh custom error class hai.

Normal JavaScript Error sirf error message rakhta hai.

Example:

throw new Error("User not found");

Isme sirf message milega:
{
   message: "User not found"
}

Lekin API banate waqt hume extra information bhi bhejni hoti hai:

{
   success: false,
   statusCode: 404,
   message: "User not found",
   errors: []
}

Isliye hum apna custom Error class banate hain.

==============================================================================
📌 class ApiError extends Error

class = blueprint / template

Real world example:

Car ka blueprint
↓
Us blueprint se bahut saari cars banti hain

Waise hi:

ApiError class
↓
Usse bahut saare error objects banenge

Example:

new ApiError(404, "User not found")
new ApiError(401, "Unauthorized")
new ApiError(500, "Server Error")

------------------------------------------------------------------------------
📌 extends Error

Error JavaScript ki built-in class hai.

Normal Error:

const error = new Error("Something went wrong");

ApiError:

class ApiError extends Error

Matlab:

"ApiError Error ki saari powers inherit karega"

Inheritance = parent ki properties aur methods lena.

Real World:

Animal
  ↓
Dog

Dog ke paas Animal ki powers bhi hongi.

Waise:

Error
  ↓
ApiError

ApiError ke paas Error ki saari powers hongi.

------------------------------------------------------------------------------
📌 constructor()

Jab bhi new keyword se object banta hai,
constructor automatically call hota hai.

Example:

const error = new ApiError(
   404,
   "User not found"
);

Internally:

constructor(
   404,
   "User not found"
)

call ho jayega.

------------------------------------------------------------------------------
📌 statusCode

HTTP Status Code store karta hai.

Common codes:

200 = Success
201 = Created
400 = Bad Request
401 = Unauthorized
403 = Forbidden
404 = Not Found
500 = Internal Server Error

Example:

new ApiError(404, "User not found")

statusCode = 404

------------------------------------------------------------------------------
📌 message = "Internal Server Error"

Default value.

Agar message pass nahi karoge:

new ApiError(500)

To automatically:

message = "Internal Server Error"

ban jayega.

------------------------------------------------------------------------------
📌 errors = []

Detailed errors store karne ke liye.

Example:

{
   name: "Required",
   email: "Invalid"
}

Ya validation errors.

Agar koi errors nahi hain:

[]

empty array rahega.

------------------------------------------------------------------------------
📌 super(message)

SABSE IMPORTANT LINE.

Error class ke constructor ko call karta hai.

Without super():

class Error extend karne par code crash ho jayega.

Example:

super("User not found");

Isse JavaScript Error class ke andar:

message property set hoti hai.

------------------------------------------------------------------------------
📌 this.statusCode = statusCode

this = current object

Example:

const error = new ApiError(404, "User not found");

Object internally:

{
   statusCode: 404
}

ban jayega.

------------------------------------------------------------------------------
📌 this.message = message

Object ke andar message save karta hai.

Result:

{
   message: "User not found"
}

------------------------------------------------------------------------------
📌 this.errors = errors

Additional error details save karta hai.

Result:

{
   errors: []
}

------------------------------------------------------------------------------
📌 this.success = false

API error response me hamesha:

success = false

rahega.

Result:

{
   success: false
}

Isliye baar baar manually likhne ki zarurat nahi.

------------------------------------------------------------------------------
📌 Error.captureStackTrace(this, this.constructor)

Advanced debugging feature.

Yeh error kahan se aaya uska stack trace store karta hai.

Example:

Login Controller
   ↓
Auth Service
   ↓
Database
   ↓
Error

Stack Trace:

Login Controller
Auth Service
Database

Developer ko exact location mil jati hai.

Production debugging me bahut useful.

------------------------------------------------------------------------------
📌 export default ApiError

Is class ko dusri files me use karne ke liye export kar rahe hain.

Example:

import ApiError from "./utils/ApiError.js";

throw new ApiError(
   404,
   "User not found"
);

==============================================================================
📌 COMPLETE FLOW

Controller
   ↓
Koi problem aayi
   ↓
throw new ApiError(404, "User not found")
   ↓
Error Middleware
   ↓
Response

{
   success: false,
   statusCode: 404,
   message: "User not found"
}

==============================================================================
📌 INTERVIEW QUESTION

Q: Custom Error Class kyu banate hain?

Answer:

Normal JavaScript Error sirf message provide karta hai.

Custom Error Class API specific information
(statusCode, success, validation errors etc.)
store karne ke liye banayi jati hai.

==============================================================================
*/