const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const app = require("../app");

// Test homepage
test("GET / should return backend welcome message", async () => {
  const response = await request(app).get("/");

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(
    response.body.message,
    "Dhanraj Portfolio Backend is running!"
  );
});

// Test health check
test("GET /api/health should return healthy status", async () => {
  const response = await request(app).get("/api/health");

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(
    response.body.message,
    "Backend is working successfully."
  );
});

// Test 404 route
test("GET /invalid-route should return 404", async () => {
  const response = await request(app).get("/invalid-route");

  assert.equal(response.status, 404);
  assert.equal(response.body.success, false);
  assert.equal(response.body.message, "Route not found.");
});

// Test contact form with missing fields
test("POST /api/contact should reject missing fields", async () => {
  const response = await request(app)
    .post("/api/contact")
    .send({
      name: "Dhanraj",
    });

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
  assert.equal(response.body.message, "All fields are required.");
});

// Test contact form with invalid phone number
test("POST /api/contact should reject invalid phone number", async () => {
  const response = await request(app)
    .post("/api/contact")
    .send({
      name: "Dhanraj",
      phone: "12345",
      message: "Hello, I want to contact you.",
    });

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
  assert.equal(
    response.body.message,
    "Please provide valid contact details."
  );
});