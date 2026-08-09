import crypto from "crypto";
import { ObjectId } from "mongodb";
import clientPromise from "../app/api/db.js";

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  throw new Error("Missing SESSION_SECRET environment variable");
}

const MAX_SESSION_AGE_SECONDS = 60 * 60 * 24;

function createSignature(encoded) {
  return crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(encoded)
    .digest("base64url");
}

function verifySignature(encoded, signature) {
  const expected = createSignature(encoded);
  const expectedBuf = Buffer.from(expected);
  const signatureBuf = Buffer.from(signature);
  if (signatureBuf.length !== expectedBuf.length) return false;
  return crypto.timingSafeEqual(signatureBuf, expectedBuf);
}

export function createSessionTokenForUser(user) {
  const payload = {
    sub: user._id.toString(),
    email: user.email,
    name: user.name,
    picture: user.picture,
    exp: Math.floor(Date.now() / 1000) + MAX_SESSION_AGE_SECONDS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createSignature(encoded);
  return `${encoded}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== "string") return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  if (!verifySignature(encoded, signature)) return null;

  let payload;
  try {
    payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
  } catch {
    return null;
  }

  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

export async function getUserFromSession(cookiesStore) {
  const sessionCookie = cookiesStore.get("session");
  if (!sessionCookie) return null;

  const payload = verifySessionToken(sessionCookie.value);
  if (!payload?.sub) return null;
  if (!ObjectId.isValid(payload.sub)) return null;

  const client = await clientPromise;
  const db = client.db("pet_adoption");
  return db.collection("users").findOne({ _id: new ObjectId(payload.sub) });
}

export async function upsertGoogleUser({ email, name, picture, googleId }) {
  if (!email) throw new Error("Google user data is missing email");

  const client = await clientPromise;
  const db = client.db("pet_adoption");
  const result = await db.collection("users").findOneAndUpdate(
    { email },
    {
      $set: { name, picture, googleId, lastLogin: new Date() },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true, returnDocument: "after" }
  );

  return result.value;
}
