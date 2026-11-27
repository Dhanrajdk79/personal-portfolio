const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const express = require("express");
const request = require("supertest");
const { createAIRouter } = require("../routes/aiRoutes");
const { generateAIResponse } = require("../services/geminiService");

function createTestApp(generateResponse) {
  const app = express();
  app.use(express.json());
  app.use("/api/ai", createAIRouter(generateResponse));
  return app;
}

describe("AI chat route", () => {
  test("rejects missing, non-string, and blank messages", async () => {
    const app = createTestApp(async () => "unused");

    for (const body of [{}, { message: 12 }, { message: "  " }]) {
      const response = await request(app).post("/api/ai/chat").send(body);
      assert.equal(response.status, 400);
      assert.equal(response.body.success, false);
      assert.equal(response.body.message, "A valid message is required.");
    }
  });

  test("trims the prompt and returns the assistant reply", async () => {
    let receivedMessage;
    const app = createTestApp(async (message) => {
      receivedMessage = message;
      return "Hello from DK AI";
    });

    const response = await request(app)
      .post("/api/ai/chat")
      .send({ message: "  Tell me about AWS  " });

    assert.equal(receivedMessage, "Tell me about AWS");
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, {
      success: true,
      reply: "Hello from DK AI",
    });
  });

  test("returns a safe error when the AI service fails", async (t) => {
    t.mock.method(console, "error", () => {});
    const app = createTestApp(async () => {
      throw new Error("provider details should not reach visitors");
    });

    const response = await request(app)
      .post("/api/ai/chat")
      .send({ message: "Hello" });

    assert.equal(response.status, 500);
    assert.deepEqual(response.body, {
      success: false,
      message: "AI service is temporarily unavailable.",
    });
  });
});

describe("Gemini response service", () => {
  test("returns trimmed model text and sends the prompt", async () => {
    let requestOptions;
    const ai = {
      models: {
        generateContent: async (options) => {
          requestOptions = options;
          return { text: "  Portfolio answer  " };
        },
      },
    };

    const reply = await generateAIResponse("What does he build?", ai);

    assert.equal(reply, "Portfolio answer");
    assert.equal(requestOptions.contents, "What does he build?");
    assert.equal(typeof requestOptions.config.systemInstruction, "string");
  });

  test("rejects an empty model response", async (t) => {
    t.mock.method(console, "error", () => {});
    const ai = {
      models: { generateContent: async () => ({ text: "  " }) },
    };

    await assert.rejects(
      generateAIResponse("Hello", ai),
      /Gemini returned an empty response/
    );
  });

  test("retries a temporary provider failure and then succeeds", async (t) => {
    t.mock.method(console, "error", () => {});
    const delays = [];
    let attempts = 0;
    const ai = {
      models: {
        generateContent: async () => {
          attempts += 1;
          if (attempts === 1) throw new Error("503 UNAVAILABLE");
          return { text: "Recovered" };
        },
      },
    };

    const reply = await generateAIResponse("Hello", ai, async (delay) => {
      delays.push(delay);
    });

    assert.equal(reply, "Recovered");
    assert.equal(attempts, 2);
    assert.deepEqual(delays, [2000]);
  });

  test("uses the configured delay between provider attempts", async (t) => {
    t.mock.method(console, "error", () => {});
    let attempts = 0;
    const ai = {
      models: {
        generateContent: async () => {
          attempts += 1;
          if (attempts === 1) throw new Error("503 UNAVAILABLE");
          return { text: "Available again" };
        },
      },
    };

    assert.equal(await generateAIResponse("Hello", ai), "Available again");
    assert.equal(attempts, 2);
  });

  test("stops retrying after the third temporary failure", async (t) => {
    t.mock.method(console, "error", () => {});
    let attempts = 0;
    const ai = {
      models: {
        generateContent: async () => {
          attempts += 1;
          throw new Error("429 RESOURCE_EXHAUSTED");
        },
      },
    };

    await assert.rejects(
      generateAIResponse("Hello", ai, async () => {}),
      /429 RESOURCE_EXHAUSTED/
    );
    assert.equal(attempts, 3);
  });
});
