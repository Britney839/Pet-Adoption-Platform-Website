import { MongoClient, ServerApiVersion } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export async function connectToDB() {
    if (cachedClient != null && cachedDb != null) {
        return { client: cachedClient, db: cachedDb }
    }

    const user = encodeURIComponent(process.env.MONGO_USER);
    const pass = encodeURIComponent(process.env.MONGO_PASSWORD);

    const uri = `mongodb+srv://${user}:${pass}@cluster0.1ujejxt.mongodb.net/`;
    
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    cachedClient = client;
    cachedDb = cachedClient.db('pet_adoption')

    return { client: cachedClient, db: cachedDb }

}