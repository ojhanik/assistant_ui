"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getTokensFromLocalStorage, TokenResponse } from "@/lib/googleAuth";

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const [showSuccess, setShowSuccess] = useState(false);
    const [tokens, setTokens] = useState<TokenResponse | null>(null);
    
    useEffect(() => {
        // Get tokens from localStorage
        const storedTokens = getTokensFromLocalStorage();
        setTokens(storedTokens);
        
        // Show success message if redirected from OAuth flow
        if (!searchParams) return;
        
        const authStatus = searchParams.get("auth");
        if (authStatus === "success") {
            setShowSuccess(true);
            
            // Hide the success message after 5 seconds
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [searchParams]);
    
    return (
        <div className="p-8 max-w-4xl mx-auto">
            {showSuccess && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Successfully authenticated with Google! Your Gmail access token has been saved.</span>
                    </div>
                    <button 
                        onClick={() => setShowSuccess(false)}
                        className="text-green-700 hover:text-green-900"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
            
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p className="text-gray-600 mb-6">Welcome to your dashboard</p>
            
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Gmail Authorization Status</h2>
                
                {tokens ? (
                    <>
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                            <p className="text-green-800 font-medium">✅ Your Gmail account has been successfully authorized</p>
                        </div>
                        
                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2">Your Access Tokens</h3>
                            <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                                <pre className="text-xs text-gray-700">
                                    {JSON.stringify(tokens, null, 2)}
                                </pre>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">These tokens allow the application to access your Gmail data.</p>
                        </div>
                    </>
                ) : (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-yellow-800">⚠️ You haven't authorized Gmail access yet</p>
                    </div>
                )}
                
                <div className="flex space-x-4">
                    <Link 
                        href="/"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Back to Home
                    </Link>
                    
                    {tokens && (
                        <button
                            onClick={() => {
                                localStorage.removeItem("googleTokens");
                                setTokens(null);
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Revoke Access
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
