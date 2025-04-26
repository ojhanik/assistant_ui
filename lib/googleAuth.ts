import { GOOGLE_OAUTH } from "@/constants/googleOAuth";

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

// Server-side only functions (these will not be included in client bundles)
// Use in API routes or Server Components only

/**
 * Get the client ID from environment variables (server-side only)
 */
export function getClientId(): string {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("Google Client ID is not defined in environment variables");
  }
  return clientId;
}

/**
 * Get the client secret from environment variables (server-side only)
 */
export function getClientSecret(): string {
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientSecret) {
    throw new Error("Google Client Secret is not defined in environment variables");
  }
  return clientSecret;
}

/**
 * Generates the Google OAuth authorization URL (can be used on server or client)
 */
export function getGoogleAuthUrl(): string {
  // For server-side, use the environment variable directly
  // For client-side, use the NEXT_PUBLIC_ prefixed version or the constant
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  
  if (!clientId) {
    throw new Error("Google Client ID is not defined");
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: GOOGLE_OAUTH.REDIRECT_URI,
    response_type: GOOGLE_OAUTH.RESPONSE_TYPE,
    scope: GOOGLE_OAUTH.SCOPES.join(" "),
    access_type: GOOGLE_OAUTH.ACCESS_TYPE,
    prompt: GOOGLE_OAUTH.PROMPT,
  });

  return `${GOOGLE_OAUTH.AUTH_URL}?${params.toString()}`;
}

/**
 * Exchange authorization code for tokens (server-side only)
 */
export async function exchangeCodeForTokens(code: string): Promise<TokenResponse> {
  const clientId = getClientId();
  const clientSecret = getClientSecret();

  const params = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: GOOGLE_OAUTH.REDIRECT_URI,
    grant_type: "authorization_code",
  });

  const response = await fetch(GOOGLE_OAUTH.TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Token exchange failed:", errorData);
    throw new Error(`Failed to exchange code for tokens: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Save tokens using the appropriate storage method based on environment
 */
export async function saveTokens(tokens: TokenResponse): Promise<void> {
  if (typeof window !== 'undefined') {
    // Client-side: Use localStorage
    saveTokensToLocalStorage(tokens);
  } else {
    // Server-side: Call backend API
    try {
      const response = await fetch('http://localhost:8080/tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: "nikhil@nurturev.com",
          token: tokens
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save tokens');
      }
    } catch (error) {
      console.error('Error saving tokens:', error);
      throw error;
    }
  }
}

// Client-side only functions

/**
 * Saves tokens to localStorage (client-side only)
 */
export function saveTokensToLocalStorage(tokens: TokenResponse): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("googleTokens", JSON.stringify(tokens));
    console.log("Tokens saved to localStorage");
  }
}

/**
 * Retrieves tokens from localStorage (client-side only)
 */
export function getTokensFromLocalStorage(): TokenResponse | null {
  if (typeof window !== "undefined") {
    const tokens = localStorage.getItem("googleTokens");
    return tokens ? JSON.parse(tokens) : null;
  }
  return null;
}
