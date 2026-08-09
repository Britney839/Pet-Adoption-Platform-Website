import { google } from 'googleapis';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { upsertGoogleUser, createSessionTokenForUser } from '../../../../lib/auth.js';

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

        if (!data?.email) {
            redirect('/login?error=Google%20user%20email%20missing');
        }

        const user = await upsertGoogleUser({
            email: data.email,
            name: data.name,
            picture: data.picture,
            googleId: data.id,
        });

        const sessionToken = createSessionTokenForUser(user);
        const cookieStore = await cookies();

        cookieStore.set('session', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24,
        });
    } catch (err) {
        console.error('Google auth callback failed:', err);
        redirect('/login?error=Google%20sign-in%20failed');
    }

    redirect('/admin');
}