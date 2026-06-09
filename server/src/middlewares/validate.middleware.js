import ApiError from "../utils/ApiError.js";



const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      return next(
        new ApiError(
          400,
          "Validation Failed",
          result.error.issues
        )
      );
    }

    next();
  };
};

export default validate;








/*
==============================================================================
📌 FILE: validate.js

PURPOSE:

Request data ko controller tak pahunchne se pehle validate karna.

Invalid data ko reject karna.

==============================================================================

📌 schema

Validation schema (usually Zod schema).

Example:

validate(userSchema)

==============================================================================

📌 Higher Order Function

validate(schema)

middleware return karta hai:

(req,res,next)=>{}

==============================================================================

📌 schema.safeParse(...)

Request data validate karta hai.

Check karta hai:

✅ req.body

✅ req.params

✅ req.query

==============================================================================

📌 req.body

Request body data.

Example:

{
   name:"Rajan"
}

==============================================================================

📌 req.params

Route parameters.

Example:

/users/123

↓

{
   id:"123"
}

==============================================================================

📌 req.query

Query parameters.

Example:

?page=2

↓

{
   page:"2"
}

==============================================================================

📌 result.success

Validation successful hai ya nahi.

true  → Valid Data

false → Invalid Data

==============================================================================

📌 Validation Fail

new ApiError(
   400,
   "Validation Failed"
)

create hota hai.

==============================================================================

📌 result.error.issues

Detailed validation errors.

Example:

[
   {
      path:["email"],
      message:"Invalid email"
   }
]

==============================================================================

📌 next(error)

Error Middleware ko call karta hai.

==============================================================================

📌 next()

Validation pass hone par next middleware/controller ko call karta hai.

==============================================================================

📌 FLOW

Client Request
      ↓
validate(schema)
      ↓
safeParse()
      ↓
Valid ?

YES
 ↓
Controller

NO
 ↓
ApiError
 ↓
errorHandler
 ↓
400 Response

==============================================================================

📌 Example Route

router.post(
   "/register",
   validate(registerSchema),
   registerUser
);

==============================================================================

📌 Interview Question

Q: Validation middleware kyu use karte hain?

Answer:

Invalid data ko controller aur database tak pahunchne se
rokne ke liye aur clean, secure input ensure karne ke liye.

==============================================================================

📌 Interview Question

Q: safeParse aur parse me kya difference hai?

parse():
Validation fail hone par exception throw karta hai.

safeParse():
Validation fail hone par success:false return karta hai.

safeParse middleware ke liye safer hai.

==============================================================================
*/