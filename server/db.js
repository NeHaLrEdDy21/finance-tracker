
const { MongoClient } = require('mongodb');

// Connection URI (replace with your actual MongoDB connection string)
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "finance_tracker";

// Create a new MongoClient
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    return client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// Close the connection
async function closeConnection() {
  await client.close();
  console.log("MongoDB connection closed");
}

module.exports = { connectToDatabase, closeConnection };
