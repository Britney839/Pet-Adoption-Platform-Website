import { google } from 'googleapis';


export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    const oauthClient = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );

    const { tokens } = await oauthClient.getToken(code);
    oauthClient.setCredentials(tokens);

    const oauth2 = google.oauth2({
        auth: oauthClient,
        version: 'v2',
    });

    const { data } = await oauth2.userinfo.get();


    console.log(data);

    return Response.json({
        message: "Logged in successfully!",
        user: data
    });
}