import { getGoogleAuthURL } from "../../googleOauthUtils";



export default async function LogInPage({ searchParams }) {
    const params = await searchParams;
    const googleURL = getGoogleAuthURL();
    const errorMessage = params?.error ? decodeURIComponent(params.error) : null;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#ffb38a] to-[#ff9c6b]">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-8 w-full max-w-md text-center">
                <h1 className="text-3xl font-bold mb-6">Log In</h1>

                {errorMessage && (
                    <p className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700">
                        {errorMessage}
                    </p>
                )}

                <a href={googleURL} className="bg-[#4285F4] hover:bg-[#357ae8] text-white px-4 py-2 rounded-lg transition font-medium shadow-sm">
                    Log in with Google
                </a>
            </div>
        </div>
    )
}