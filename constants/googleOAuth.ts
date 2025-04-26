export const GOOGLE_OAUTH = {
  AUTH_URL: "https://accounts.google.com/o/oauth2/v2/auth",
  TOKEN_URL: "https://oauth2.googleapis.com/token",
  REDIRECT_URI: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "http://localhost:3000/api/oauth2/callback",
  SCOPES: ["https://www.googleapis.com/auth/gmail.readonly"],
  ACCESS_TYPE: "offline",
  PROMPT: "consent",
  RESPONSE_TYPE: "code",
};
