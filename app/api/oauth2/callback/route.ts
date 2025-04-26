import { exchangeCodeForTokens, saveTokens } from "@/lib/googleAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Get the authorization code from the URL
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  
  // Handle error case
  if (!code) {
    const error = searchParams.get("error");
    console.error("OAuth error:", error);
    return NextResponse.redirect(new URL("/auth-error", request.url));
  }

  try {
    // Exchange the authorization code for tokens
    const tokens = await exchangeCodeForTokens(code);
    
    // Save the tokens
    await saveTokens(tokens);
    
    // Redirect to dashboard with success
    return NextResponse.redirect(new URL("/dashboard?auth=success", request.url));
  } catch (error) {
    console.error("Token exchange error:", error);
    // Return a more informative error response
    if (error instanceof Error) {
      console.error(error.message);
    }
    return NextResponse.redirect(new URL("/auth-error", request.url));
  }
}
