"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveTokensToLocalStorage, TokenResponse } from "@/lib/googleAuth";
import { GOOGLE_OAUTH } from "@/constants/googleOAuth";

export default function OAuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        const handleCallback = async () => {
            try {
                if (!searchParams) return;
                
                // Check for error in the callback
                const error = searchParams.get("error");
                if (error) {
                    console.error("OAuth error:", error);
                    setStatus("error");
                    setErrorMessage(error);
                    return;
                }

                // Get the authorization code
                const code = searchParams.get("code");
                if (!code) {
                    setStatus("error");
                    setErrorMessage("No authorization code received");
                    return;
                }

                // For demo purposes, we'll just create a mock token response
                // In a real application, you would exchange the code for tokens
                const mockTokenResponse: TokenResponse = {
                    access_token: "mock_access_token_" + Math.random().toString(36).substring(2),
                    refresh_token: "mock_refresh_token_" + Math.random().toString(36).substring(2),
                    expires_in: 3600,
                    token_type: "Bearer",
                    scope: GOOGLE_OAUTH.SCOPES.join(" ")
                };

                // Save the tokens to localStorage
                saveTokensToLocalStorage(mockTokenResponse);
                
                // Set success status
                setStatus("success");
                
                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    router.push("/dashboard?auth=success");
                }, 1500);
            } catch (error) {
                console.error("Error handling OAuth callback:", error);
                setStatus("error");
                setErrorMessage(error instanceof Error ? error.message : "Unknown error");
            }
        };

        handleCallback();
    }, [searchParams, router]);

    if (status === "loading") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                <p className="mt-4 text-lg">Processing authorization...</p>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Authorization Error</h1>
                    <p className="text-gray-700 mb-6">{errorMessage || "There was an error processing your authorization."}</p>
                    <button
                        onClick={() => router.push("/")}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-center mb-2">Authorization Successful!</h1>
                <p className="text-gray-600 text-center mb-6">You have successfully authorized access to your Gmail account.</p>
                <p className="text-gray-600 text-center mb-6">Redirecting to dashboard...</p>
            </div>
        </div>
    );
}
