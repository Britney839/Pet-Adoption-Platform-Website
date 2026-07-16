import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies();
    cookieStore.delete("session");

    return Response.redirect(
        new URL("/", process.env.NEXT_PUBLIC_URL)
    )
}