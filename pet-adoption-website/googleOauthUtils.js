import { google } from 'googleapis';

const oauthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
)

export const getGoogleAuthURL = () => {
    return oauthClient.generateAuthUrl({
        access_type: 'offline',
        scope : [
            "openid",
            "email",
            "profile"
        ]
    })

}

export const getGoogleUser = async (code) => {
    const { tokens } = await oauthClient.getToken(code)
    oauthClient.setCredentials(tokens)

    const response = await fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
        headers: {
            Authorization: `Bearer ${tokens.access_token}`
        }
    })

    const user = await response.json()
    return user;

}