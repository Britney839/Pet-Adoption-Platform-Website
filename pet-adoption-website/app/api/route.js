

export async function GetPets() {
    try {
        const pets = `https://dog.ceo/api/breeds/image/random`;

        const response = await fetch(pets, {
            method: 'GET',
             headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error('Failed to fetch pets');
        }

        const data = await response.json();
        return data;

        } catch (error) {
            console.error('Error fetching pets:', error.message);
        }

}

