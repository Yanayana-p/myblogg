const axios = require("axios");

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Test user
const testUser = {
  username: "DianaTest",
  email: "diana@test.com",
  password: "123456",
};

// ----- Quick Test -----
(async () => {
  try {
    console.log("🔹 Testing REGISTER...");
    let res = await api.post("/auth/register", testUser);
    console.log("REGISTER response:", res.data);

    console.log("🔹 Testing LOGIN...");
    res = await api.post("/auth/login", {
      email: testUser.email,
      password: testUser.password,
    });
    console.log("LOGIN response:", res.data);

    console.log("🔹 Testing CONTACT...");
    res = await api.post("/contact", {
      name: "Diana",
      email: "diana@test.com",
      message: "Hello! This is a test message.",
    });
    console.log("CONTACT response:", res.data);

    console.log("🔹 Testing DASHBOARD (recent reads)...");
    res = await api.get("/dashboard/recent-reads", {
      params: { email: testUser.email },
    });
    console.log("DASHBOARD response:", res.data);

    console.log("✅ Quick test completed!");
  } catch (err) {
    console.error("❌ Test failed:", err.response?.data || err.message);
  }
})();
