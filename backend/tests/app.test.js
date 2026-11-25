
const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

process.env.GOOGLE_SCRIPT_URL = "https://example.test/google-script";

const app = require("../app");

// ==================================================
// GENERAL API TESTS
// ==================================================

describe("General API Tests", () => {
  test("GET / should return backend welcome message", async () => {
    const response = await request(app).get("/");

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.equal(
      response.body.message,
      "Dhanraj Portfolio Backend is running!"
    );
  });

  test("GET /api/health should return healthy status", async () => {
    const response = await request(app).get("/api/health");

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.equal(
      response.body.message,
      "Backend is working successfully."
    );
  });

  test("GET /invalid-route should return 404", async () => {
    const response = await request(app).get("/invalid-route");

    assert.equal(response.status, 404);
    assert.equal(response.body.success, false);
    assert.equal(response.body.message, "Route not found.");
  });
});

// ==================================================
// CONTACT API VALIDATION TESTS
// ==================================================

describe("Contact API Validation Tests", () => {
  test("should reject missing fields", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Dhanraj",
      });

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
    assert.equal(response.body.message, "All fields are required.");
  });

  test("should reject missing phone number", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Dhanraj",
        message: "Hello, I want to contact you.",
      });

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
    assert.equal(response.body.message, "All fields are required.");
  });

  test("should reject missing message", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Dhanraj",
        phone: "9876543210",
      });

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
    assert.equal(response.body.message, "All fields are required.");
  });

  test("should reject whitespace-only fields", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "   ",
        phone: "9876543210",
        message: "   ",
      });

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
    assert.equal(response.body.message, "All fields are required.");
  });

  describe("Invalid Phone Number Tests", () => {
    const invalidPhones = [
      "12345",
      "123456789",
      "1234567890123456",
      "abcdefghij",
      "98765abcde",
    ];

    for (const phone of invalidPhones) {
      test(`should reject phone number: ${phone}`, async () => {
        const response = await request(app)
          .post("/api/contact")
          .send({
            name: "Dhanraj",
            phone,
            message: "Hello, I want to contact you.",
          });

        assert.equal(response.status, 400);
        assert.equal(response.body.success, false);
        assert.equal(
          response.body.message,
          "Please provide valid contact details."
        );
      });
    }
  });

  test("should reject invalid phone number", async () => {
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

  test("should reject name longer than 100 characters", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "A".repeat(101),
        phone: "9876543210",
        message: "Hello, I want to contact you.",
      });

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
    assert.equal(
      response.body.message,
      "Please provide valid contact details."
    );
  });

  test("should reject message longer than 2000 characters", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Dhanraj",
        phone: "9876543210",
        message: "A".repeat(2001),
      });

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
    assert.equal(
      response.body.message,
      "Please provide valid contact details."
    );
  });

  test("should not call external API for invalid input", async (t) => {
    const fetchMock = t.mock.method(global, "fetch");

    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Dhanraj",
        phone: "12345",
        message: "Invalid phone test",
      });

    assert.equal(response.status, 400);
    assert.equal(fetchMock.mock.calls.length, 0);
  });
});

// ==================================================
// CONTACT API SUCCESS TESTS
// ==================================================

describe("Contact API Success Tests", () => {
  test("should accept valid contact details", async (t) => {
    t.mock.method(global, "fetch", async () => {
      return new Response(
        JSON.stringify({
          success: true,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });

    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Dhanraj",
        phone: "9876543210",
        message: "Hello, I want to contact you.",
      });

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.equal(
      response.body.message,
      "Your message was saved successfully!"
    );
  });

  test("should normalize phone number and send correct payload", async (t) => {
    let capturedUrl;
    let capturedOptions;

    t.mock.method(global, "fetch", async (url, options) => {
      capturedUrl = url;
      capturedOptions = options;

      return new Response(
        JSON.stringify({
          success: true,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });

    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Dhanraj",
        phone: "98765-43210",
        message: "Hello, I want to contact you.",
      });

    assert.equal(response.status, 200);

    assert.equal(capturedUrl, process.env.GOOGLE_SCRIPT_URL);
    assert.equal(capturedOptions.method, "POST");

    const payload = JSON.parse(capturedOptions.body);

    assert.deepEqual(payload, {
      name: "Dhanraj",
      phone: "9876543210",
      message: "Hello, I want to contact you.",
    });
  });

  test("should trim name and message", async (t) => {
    let capturedPayload;

    t.mock.method(global, "fetch", async (url, options) => {
      capturedPayload = JSON.parse(options.body);

      return new Response(
        JSON.stringify({
          success: true,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });

    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "  Dhanraj  ",
        phone: "9876543210",
        message: "  Hello, I want to contact you.  ",
      });

    assert.equal(response.status, 200);

    assert.deepEqual(capturedPayload, {
      name: "Dhanraj",
      phone: "9876543210",
      message: "Hello, I want to contact you.",
    });
  });

  test("should remove spaces from phone number", async (t) => {
    let capturedPayload;

    t.mock.method(global, "fetch", async (url, options) => {
      capturedPayload = JSON.parse(options.body);

      return new Response(
        JSON.stringify({
          success: true,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });

    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Dhanraj",
        phone: "98765 43210",
        message: "Testing phone spaces",
      });

    assert.equal(response.status, 200);
    assert.equal(capturedPayload.phone, "9876543210");
  });
});

// ==================================================
// CONTACT API ERROR HANDLING TESTS
// ==================================================

describe("Contact API Error Handling Tests", () => {
  test("should handle Google Apps Script failure", async (t) => {
    t.mock.method(global, "fetch", async () => {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unable to save your message.",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });

    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Dhanraj",
        phone: "9876543210",
        message: "Testing API failure",
      });

    assert.equal(response.status, 502);
    assert.equal(response.body.success, false);
    assert.equal(
      response.body.message,
      "Unable to save your message."
    );
  });

  test("should handle network failure", async (t) => {
    t.mock.method(global, "fetch", async () => {
      throw new Error("Network connection failed");
    });

    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Dhanraj",
        phone: "9876543210",
        message: "Testing network failure",
      });

    assert.equal(response.status, 502);
    assert.equal(response.body.success, false);
    assert.equal(
      response.body.message,
      "Unable to submit your message. Please try again."
    );
  });

  test("should handle external server HTTP error", async (t) => {
    t.mock.method(global, "fetch", async () => {
      return new Response("Internal Server Error", {
        status: 500,
      });
    });

    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Dhanraj",
        phone: "9876543210",
        message: "Testing external server error",
      });

    assert.equal(response.status, 502);
    assert.equal(response.body.success, false);
    assert.equal(
      response.body.message,
      "Unable to submit your message. Please try again."
    );
  });

  test("should handle missing Google Script URL", async (t) => {
    const originalUrl = process.env.GOOGLE_SCRIPT_URL;

    delete process.env.GOOGLE_SCRIPT_URL;

    t.after(() => {
      if (originalUrl !== undefined) {
        process.env.GOOGLE_SCRIPT_URL = originalUrl;
      }
    });

    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Dhanraj",
        phone: "9876543210",
        message: "Testing missing configuration",
      });

    assert.equal(response.status, 500);
    assert.equal(response.body.success, false);
    assert.equal(
      response.body.message,
      "Google Apps Script URL is not configured."
    );
  });
});
