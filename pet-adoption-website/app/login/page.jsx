import { getGoogleAuthURL } from "../../googleOauthUtils";



export default async function LogInPage({ searchParams }) {
    const params = await searchParams;
    const googleURL = getGoogleAuthURL();
    const errorMessage = params?.error ? decodeURIComponent(params.error) : null;

    return (
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_#fff7ed,_#ffe0c2_45%,_#ffb38a_100%)] px-4 py-10">
            <div className="w-full max-w-md rounded-[2rem] border border-[#f7d4b6] bg-white/95 p-8 text-center shadow-[0_20px_60px_rgba(255,146,98,0.22)] backdrop-blur">
                <div className="mb-6">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff2e8] text-3xl shadow-sm">
                        🐾
                    </div>
                    <h1 className="text-3xl font-bold text-[#7a4a2f]">Welcome back!</h1>
                    <p className="mt-2 text-sm text-[#8c6450]">
                        Sign in to continue helping pets find their forever homes.
                    </p>
                </div>

                {errorMessage && (
                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {errorMessage}
                    </div>
                )}

                <a
                    href={googleURL}
                    className="flex items-center justify-center gap-3 rounded-full bg-[#4285F4] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#357ae8]"
                >
                    <span className="text-lg">G</span>
                    Sign in with Google
                </a>

                <div className="mt-6 rounded-2xl bg-[#fff8f2] p-4 text-sm text-[#8b5e3c]">
                    New here? Your account helps us keep track of your favorite adoption matches.
                </div>
            </div>
        </div>
    )
}