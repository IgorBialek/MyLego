import { OAuth } from "oauth";

export const bricklink = new OAuth(
    "",
    "",
    process.env.BRICKLINK_CONSUMER_KEY!,
    process.env.BRICKLINK_CONSUMER_SECRET!,
    "1.0",
    null,
    "HMAC-SHA1"
  );