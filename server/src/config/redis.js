// import Redis from "ioredis";

// let redis = null;

// const connectRedis = async () => {
//   try {
//     redis = new Redis(process.env.REDIS_URL);

//     redis.on("connect", () => {
//       console.log("✅ Redis Connected");
//     });

//     redis.on("error", (error) => {
//       console.log("❌ Redis Error:", error.message);
//     });

//     return redis;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export { redis };
// export default connectRedis;



import Redis from "ioredis";
import env from "./env.js";
import logger from "../utils/logger.js";

let redis = null;

const connectRedis = async () => {
  try {
    redis = new Redis(env.REDIS_URL, {
      // Upstash ke liye zaroori hai yeh options
      tls: {
        rejectUnauthorized: false,
      },
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        // 3 baar try karega, phir band ho jayega
        if (times > 3) {
          logger.error("❌ Redis: Max retries reached, giving up.");
          return null; // null return karne se retry band hoti hai
        }
        // Har retry ke beech 500ms wait
        return Math.min(times * 500, 2000);
      },
    });

    redis.on("connect", () => {
      logger.info("✅ Redis Connected (Upstash)");
    });

    redis.on("error", (error) => {
      // Sirf ek baar print karega — bar bar nahi
      logger.error("❌ Redis Error:", error.message || "Connection failed");
    });

    // Test karo ki sach mein connect hua ya nahi
    await redis.ping();
    logger.info("✅ Redis PING successful");

    return redis;
  } catch (error) {
    logger.error("❌ Redis connection failed:", error.message);
    // Server crash mat karo sirf Redis ki wajah se
    // Redis optional hai — app bina Redis ke bhi chalegi
    redis = null;
    return null;
  }
};

export { redis };
export default connectRedis;