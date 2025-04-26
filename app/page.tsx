import { GoogleAuthorizeButton } from "@/components/google-auth/authorize-button";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-8">
            <h1 className="text-4xl font-bold">Authorize Gmail</h1>
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-gray-700">Click the button below to authorize access to your Gmail account</p>
                <GoogleAuthorizeButton />
            </div>
        </div>
    );
}
