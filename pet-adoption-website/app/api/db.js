import { MongoClient, ServerApiVersion } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export async function connectToDB() {
    if( cachedClient != null && cachedDb != null) {
        return {client: cachedClient, db: cachedDb}
    }
    
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.e1yifa4.mongodb.net/?appName=Cluster0`;
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
        
    return {client: cachedClient, db: cachedDb}

}