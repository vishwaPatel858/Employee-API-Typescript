const redis = require("redis");
export const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("connect", () => {
  redisClient.set("name", "default", "EX", 3600);
  console.log("Redis is running on localhost: ");
});

redisClient.on("error", (err: any) => {
  const message = err instanceof Error ? err.message : "Unknown error.";
  console.error("Redis error:", message);
});
