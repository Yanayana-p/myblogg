const { connectDB, getDB } = require("./db");

async function seedAdmin() {
  await connectDB();
  const db = getDB();

  const existing = await db.collection("users").findOne({ email: "admin@myblog.com" });
  if (!existing) {
    await db.collection("users").insertOne({
      username: "XOXO",
      email: "admin@myblog.com",
      password: "inasalmamamo",
      isAdmin: true
    });
    console.log("Admin user created!");
  } else {
    console.log("Admin already exists.");
  }

  process.exit(0);
}

seedAdmin();
