class ApiResponse {
    constructor(statusCode, data, message="Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}


export default ApiResponse;








/*
==============================================================================
📌 FILE: ApiResponse.js

🎯 PURPOSE:

Yeh custom success response class hai.

API se jab data successfully return hota hai tab har jagah
same response structure maintain karne ke liye use kiya jata hai.

Without ApiResponse:

res.json({
   user: user
});

Kahin aur:

res.json({
   data: user,
   success: true
});

Kahin aur:

res.json({
   result: user
});

Har jagah alag format ho jayega.

Isliye ApiResponse class use karte hain.

==============================================================================

📌 class ApiResponse

class = blueprint / template

Real World Example:

Ghar ka blueprint
↓
Us blueprint se multiple ghar bante hain

Waise hi:

ApiResponse class
↓
Usse multiple response objects banenge

Example:

new ApiResponse(200, user)

new ApiResponse(
   201,
   createdUser,
   "User created successfully"
)

==============================================================================

📌 constructor(statusCode, data, message = "Success")

Constructor object create hote hi automatically call hota hai.

Example:

new ApiResponse(
   200,
   user,
   "User fetched successfully"
)

Internally:

statusCode = 200

data = user

message = "User fetched successfully"

==============================================================================

📌 statusCode

HTTP Status Code store karta hai.

Common Success Codes:

200 = OK
201 = Created
202 = Accepted
204 = No Content

Example:

new ApiResponse(200, user)

statusCode = 200

==============================================================================

📌 data

Actual data store karta hai.

Example:

const user = {
   name: "Rajan",
   email: "rajan@gmail.com"
}

new ApiResponse(200, user)

Result:

{
   data: {
      name: "Rajan",
      email: "rajan@gmail.com"
   }
}

Yahi actual response data hota hai.

==============================================================================

📌 message = "Success"

Default message.

Agar message nahi bheja:

new ApiResponse(200, user)

To automatically:

message = "Success"

ho jayega.

==============================================================================

📌 this.statusCode = statusCode

this = current object

Example:

new ApiResponse(200, user)

Object ke andar:

{
   statusCode: 200
}

store ho jayega.

==============================================================================

📌 this.data = data

Response data save karta hai.

Example:

{
   data: user
}

==============================================================================

📌 this.message = message

Response message save karta hai.

Example:

{
   message: "User fetched successfully"
}

==============================================================================

📌 this.success = statusCode < 400

🔥 SABSE IMPORTANT LINE

Yeh automatically decide karta hai ki request successful hai ya nahi.

Logic:

Agar status code 400 se chhota hai

To:

success = true

Agar status code 400 ya usse bada hai

To:

success = false

Examples:

------------------------------------------------

statusCode = 200

200 < 400

Result:

success = true

------------------------------------------------

statusCode = 201

201 < 400

Result:

success = true

------------------------------------------------

statusCode = 404

404 < 400

Result:

success = false

------------------------------------------------

statusCode = 500

500 < 400

Result:

success = false

==============================================================================

📌 WHY THIS LINE IS USEFUL?

Without this:

new ApiResponse(200, user)

Aur manually likhna pade:

success: true

Har baar.

Lekin ab:

this.success = statusCode < 400

Automatically calculate ho jata hai.

==============================================================================

📌 COMPLETE OBJECT

Example:

new ApiResponse(
   200,
   {
      name: "Rajan"
   },
   "User fetched successfully"
)

Object:

{
   statusCode: 200,
   data: {
      name: "Rajan"
   },
   message: "User fetched successfully",
   success: true
}

==============================================================================

📌 export default ApiResponse

Dusri files me use karne ke liye export kar rahe hain.

Example:

import ApiResponse from "../utils/ApiResponse.js";

==============================================================================

📌 CONTROLLER FLOW

Controller
   ↓
Database se data mila
   ↓
new ApiResponse(...)
   ↓
res.json(...)
   ↓
Client ko response

Example:

res.status(200).json(
   new ApiResponse(
      200,
      user,
      "User fetched successfully"
   )
);

Final Response:

{
   "statusCode": 200,
   "data": {
      "name": "Rajan"
   },
   "message": "User fetched successfully",
   "success": true
}

==============================================================================

📌 DIFFERENCE BETWEEN ApiError & ApiResponse

ApiError
↓
Error ke liye

{
   success: false,
   message: "User not found"
}

------------------------------------------------

ApiResponse
↓
Success ke liye

{
   success: true,
   data: {},
   message: "Success"
}

==============================================================================

📌 INTERVIEW QUESTION

Q: ApiResponse class kyu banate hain?

Answer:

Application ke saare API responses ko consistent
aur standardized format me return karne ke liye.

Isse frontend developer ko har API ka response
same structure me milta hai aur code maintain karna
easy ho jata hai.

==============================================================================
*/