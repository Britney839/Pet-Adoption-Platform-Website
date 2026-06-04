

export async function GET() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");

        const data = await response.json();
        return Response.json(data);

        } catch (error) {
            return Response.json({ error: 'Failed to fetch pets' }, { status: 500 });
        }

}

