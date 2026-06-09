import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

export default rateLimiter;








/*
==============================================================================
📌 FILE: rateLimiter.js

PURPOSE:

Server ko spam, abuse, brute-force attacks aur excessive
traffic se protect karna.

==============================================================================

📌 express-rate-limit

Express middleware jo requests count karta hai
aur limit cross hone par block kar deta hai.

==============================================================================

📌 windowMs

Tracking time window.

15 * 60 * 1000

= 15 Minutes

==============================================================================

📌 max

Maximum allowed requests.

max: 100

Matlab:

Ek IP address
↓
15 minute me
↓
100 requests

==============================================================================

📌 101st Request

Block ho jayegi.

==============================================================================

📌 message

Limit cross hone par client ko bheja jane wala response.

Example:

{
   success:false,
   message:"Too many requests, please try again later."
}

==============================================================================

📌 Security Benefits

✅ Prevent Spam

✅ Prevent Brute Force Attacks

✅ Prevent API Abuse

✅ Reduce Server Load

==============================================================================

📌 Real Example

Attacker:

POST /login

1000 times

Without Rate Limiter:
Server overload

With Rate Limiter:
100 requests ke baad blocked

==============================================================================

📌 App Usage

app.use(rateLimiter);

==============================================================================

📌 FLOW

Client Request
      ↓
Rate Limiter
      ↓
Request Count Check
      ↓
Limit Cross ?
      ↓
No  → Continue
Yes → Block Request

==============================================================================

📌 Interview Question

Q: Rate Limiter kyu use karte hain?

Answer:

Application ko brute-force attacks, spam requests,
API abuse aur excessive traffic se protect karne ke liye.

==============================================================================
*/