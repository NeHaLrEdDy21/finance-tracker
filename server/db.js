const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/finance-tracker';

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    if (!cachedClient) {
        cachedClient = new MongoClient(uri, {
            connectTimeoutMS: 5000,
            serverSelectionTimeoutMS: 5000,
        });
        await cachedClient.connect();
    }

    cachedDb = cachedClient.db('finance-tracker');
    return cachedDb;
}

module.exports = { connectToDatabase };
