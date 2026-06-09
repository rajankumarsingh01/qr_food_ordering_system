import winston from "winston";

const { combine, timestamp, errors, json, colorize, printf } =
  winston.format;

const developmentFormat = printf(
  ({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  }
);

const logger = winston.createLogger({
  level: "info",

  format: combine(
    timestamp(),
    errors({ stack: true }),
    json()
  ),

  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        developmentFormat
      ),
    })
  );
}

export default logger;

















/*
==============================================================================
📌 FILE: logger.js

PURPOSE:

Production-grade logging system.

console.log() ki jagah Winston use kiya gaya hai.

Benefits:

✅ Logs file me save hote hain
✅ Error stack save hota hai
✅ Production debugging easy hoti hai
✅ Different log levels support karta hai

==============================================================================

📌 winston

Professional logging library.

==============================================================================

📌 level: "info"

Minimum log level.

Allowed:

error
warn
info
debug

==============================================================================

📌 timestamp()

Har log ke saath time add karta hai.

==============================================================================

📌 errors({ stack: true })

Error stack trace save karta hai.

==============================================================================

📌 json()

Logs ko JSON format me save karta hai.

==============================================================================

📌 transports

Logs ko kahan store karna hai.

==============================================================================

📌 error.log

Sirf error logs.

==============================================================================

📌 combined.log

Saare logs.

==============================================================================

📌 Console Transport

Development mode me terminal me logs show karega.

==============================================================================

📌 NODE_ENV !== "production"

Sirf development me console logging.

Production me logs files me save honge.

==============================================================================

📌 Example

logger.info("Server Started");

logger.error("Database Error");

==============================================================================

📌 Interview Question

Q: Winston kyu use karte hain?

Answer:

Production applications me structured logging,
error tracking aur log persistence ke liye.

console.log production systems ke liye enough nahi hota.

==============================================================================
*/












