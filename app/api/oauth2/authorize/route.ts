import { getGoogleAuthUrl } from "@/lib/googleAuth";
import { NextResponse } from "next/server";

/**
 * API route to generate the Google OAuth authorization URL
 * This keeps the client ID and other sensitive parameters on the server
 */
export async function GET() {
  try {
    // Generate the authorization URL on the server side
    const authUrl = getGoogleAuthUrl();
    
    // Return the URL to the client
    return NextResponse.json({ authUrl }, { status: 200 });
  } catch (error) {
    console.error("Error generating authorization URL:", error);
    return NextResponse.json(
      { error: "Failed to generate authorization URL" },
      { status: 500 }
    );
  }
}
