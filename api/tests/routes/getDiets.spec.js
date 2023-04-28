const request = require("supertest");
const app = require("../../src/app");
const { Diet } = require("../../src/db");

describe("GET /diets", () => {
  before(async () => {
    await Diet.sync({ force: true });
  });
  it("should respond with status code 200", async () => {
    try {
      const res = await request(app).get("/diets");
      expect(res.statusCode).toBe(200);
    } catch (error) {
      throw error;
    }
  });
});
