import { google } from 'googleapis';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (error) {
        redirect(`/login?error=${encodeURIComponent(errorDescription || error)}`);
    }

    if (!code) {
        redirect('/login?error=Missing%20Google%20authorization%20code');
    }

    const oauthClient = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );

    try {
        const { tokens } = await oauthClient.getToken({
            code,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        });
        oauthClient.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: oauthClient,
            version: 'v2',
        });

        const { data } = await oauth2.userinfo.get();

        const cookieStore = await cookies();

        cookieStore.set(
            'session',
            JSON.stringify(data),
            {
                httpOnly: true,
                secure: false,
                maxAge: 60 * 60 * 24,
            }
        );
    } catch (err) {
        console.error('Google auth callback failed:', err);
        redirect('/login?error=Google%20sign-in%20failed');
    }

    redirect('/admin');
}