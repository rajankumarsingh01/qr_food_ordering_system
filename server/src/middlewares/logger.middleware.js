import morgan from "morgan";

const logger = morgan((tokens, req, res) => {
  return [
    "🟢 METHOD:", tokens.method(req, res),
    "| URL:", tokens.url(req, res),
    "| STATUS:", tokens.status(req, res),
    "| TIME:", tokens["response-time"](req, res), "ms"
  ].join(" ");
});

export default logger;












/*
==============================================================================
📌 FILE: requestLogger.js (Morgan)

PURPOSE:

Har incoming HTTP request ko track karna.

Morgan request details log karta hai:

✅ Method
✅ URL
✅ Status Code
✅ Response Time

==============================================================================

📌 morgan(...)

Morgan middleware create karta hai.

Express me:

app.use(logger);

ke through use hota hai.

==============================================================================

📌 tokens

Morgan ke built-in helper functions.

Examples:

tokens.method()
tokens.url()
tokens.status()
tokens["response-time"]()

==============================================================================

📌 tokens.method(req,res)

Request method return karta hai.

Examples:

GET
POST
PUT
DELETE

==============================================================================

📌 tokens.url(req,res)

Request URL return karta hai.

Example:

/api/users

==============================================================================

📌 tokens.status(req,res)

Response status code return karta hai.

Examples:

200
404
500

==============================================================================

📌 tokens["response-time"](req,res)

Request complete hone me kitna time laga.

Example:

15 ms

==============================================================================

📌 join(" ")

Array ko string me convert karta hai.

==============================================================================

📌 Example Output

🟢 METHOD: GET
| URL: /api/users
| STATUS: 200
| TIME: 15 ms

==============================================================================

📌 Morgan vs Winston

Morgan:
HTTP Request Logging

Winston:
Application/Error Logging

==============================================================================

📌 FLOW

Client Request
      ↓
Morgan Middleware
      ↓
Request Details Collect
      ↓
Controller
      ↓
Response
      ↓
Log Print

==============================================================================

📌 Interview Question

Q: Morgan kyu use karte hain?

Answer:

Application me aane wali har HTTP request ko monitor,
debug aur track karne ke liye.

==============================================================================
*/