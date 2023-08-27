const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();

const dbURI = `mongodb+srv://vigmurug:${process.env.MONGO_PASSWORD}@cluster0.gnl5jtd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(dbURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    
        const db = client.db('StreakStack');
        return db;
    }  catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

module.exports = { connectToDB };