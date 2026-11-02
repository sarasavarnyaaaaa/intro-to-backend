// test-endpoints.js
// Automated test script for all 8 assignment endpoints
const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

async function runTests() {
  console.log(`\n========================================`);
  console.log(`🧪 Testing Assignment APIs against ${BASE_URL}`);
  console.log(`========================================\n`);
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.log(`  ❌ FAIL: ${name}`);
      console.log(`     Error: ${err.message}`);
      failed++;
    }
  }

  // 1. Health check
  await test("GET / (Health Check)", async () => {
    const res = await fetch(`${BASE_URL}/`);
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
    const data = await res.json();
    if (!data.message) throw new Error(`Unexpected response: ${JSON.stringify(data)}`);
  });

  const timestamp = Date.now();
  const testUser = {
    username: `demo_user_${timestamp}`,
    email: `demo_${timestamp}@example.com`,
    password: "demo123"
  };

  // 2. Register
  await test("POST /api/v1/users/register (Register User)", async () => {
    const res = await fetch(`${BASE_URL}/api/v1/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testUser)
    });
    if (res.status !== 201) {
      const err = await res.text();
      throw new Error(`Expected status 201, got ${res.status}: ${err}`);
    }
    const data = await res.json();
    if (!data.user?._id) throw new Error("Missing user._id in response");
  });

  // 3. Login
  await test("POST /api/v1/users/login (Login User)", async () => {
    const res = await fetch(`${BASE_URL}/api/v1/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testUser.email, password: testUser.password })
    });
    if (res.status !== 200) {
      const err = await res.text();
      throw new Error(`Expected status 200, got ${res.status}: ${err}`);
    }
  });

  // 4. Logout
  await test("POST /api/v1/users/logout (Logout User)", async () => {
    const res = await fetch(`${BASE_URL}/api/v1/users/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testUser.email })
    });
    if (res.status !== 200) {
      const err = await res.text();
      throw new Error(`Expected status 200, got ${res.status}: ${err}`);
    }
  });

  // 5. Create Post
  let createdPostId = null;
  await test("POST /api/v1/posts/create (Create Post)", async () => {
    const res = await fetch(`${BASE_URL}/api/v1/posts/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Kina",
        description: "Martial arts artist",
        age: 26
      })
    });
    if (res.status !== 201) {
      const err = await res.text();
      throw new Error(`Expected status 201, got ${res.status}: ${err}`);
    }
    const data = await res.json();
    createdPostId = data.post?._id;
    if (!createdPostId) throw new Error("Missing post._id in response");
  });

  // 6. Get All Posts
  await test("GET /api/v1/posts/ (Get All Posts)", async () => {
    const res = await fetch(`${BASE_URL}/api/v1/posts/`);
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.posts)) throw new Error("Expected posts to be an array");
  });

  // 7. Get Post by ID
  await test("GET /api/v1/posts/:id (Get Post by ID)", async () => {
    if (!createdPostId) throw new Error("Cannot test without createdPostId");
    const res = await fetch(`${BASE_URL}/api/v1/posts/${createdPostId}`);
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
    const data = await res.json();
    if (data.post?._id !== createdPostId) throw new Error("Fetched post ID does not match");
  });

  // 8. Update Post
  await test("PATCH /api/v1/posts/update/:id (Update Post)", async () => {
    if (!createdPostId) throw new Error("Cannot test without createdPostId");
    const res = await fetch(`${BASE_URL}/api/v1/posts/update/${createdPostId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Lily",
        description: "A cute flower",
        age: 2
      })
    });
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
    const data = await res.json();
    if (data.post?.name !== "Lily") throw new Error("Post name was not updated");
  });

  // 9. Delete Post
  await test("DELETE /api/v1/posts/delete/:id (Delete Post)", async () => {
    if (!createdPostId) throw new Error("Cannot test without createdPostId");
    const res = await fetch(`${BASE_URL}/api/v1/posts/delete/${createdPostId}`, {
      method: "DELETE"
    });
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
  });

  console.log(`\n========================================`);
  console.log(`📊 Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
