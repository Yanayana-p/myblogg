const { MongoClient } = require("mongodb");

// Local MongoDB URI
const uri = "mongodb://127.0.0.1:27017/MyBlogg"; 

// Define the client here
const client = new MongoClient(uri);

let db; 

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect(); 
    db = client.db("myblog"); 
    console.log("✅ Connected to local MongoDB successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

// Getter to access the db in routes
function getDB() {
  if (!db) throw new Error("Database not connected. Call connectDB() first.");
  return db;
}

module.exports = { connectDB, getDB };
