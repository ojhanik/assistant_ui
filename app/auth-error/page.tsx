"use client";

import React from "react";
import Link from "next/link";

export default function AuthErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
                <p className="text-gray-700 mb-6">
                    There was a problem authenticating with Google. This could be due to:
                </p>
                <ul className="list-disc pl-5 mb-6 text-gray-700">
                    <li>Missing or invalid credentials</li>
                    <li>Authorization was denied</li>
                    <li>The authentication request timed out</li>
                </ul>
                <div className="flex flex-col space-y-4">
                    <Link 
                        href="/"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-center transition-colors"
                    >
                        Return to Home
                    </Link>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md text-center transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
}
