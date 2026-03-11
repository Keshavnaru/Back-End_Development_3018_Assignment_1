import "jest";
import { app } from "../src/app";
import { describe, it, expect } from "@jest/globals";

import request, { Response } from "supertest";


describe("API Route Tests", () => {


  // Health check route

  describe("GET /api/v1/health", () => {
    it("should return a valid health check response", async () => {
      const response: Response = await request(app).get("/api/v1/health");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status", "ok");
      expect(response.body).toHaveProperty("uptime");
      expect(response.body).toHaveProperty("timestamp");
      expect(response.body).toHaveProperty("version", "1.0.0");
    });
  });


  // Investment route

  describe("POST /api/v1/investment", () => {

    it("should return correct performance for a gain", async () => {
      const response: Response = await request(app)
        .post("/api/v1/investment")
        .send({ initialInvestment: 1000, currentValue: 1300 })
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.profitOrLoss).toBe(300);
      expect(response.body.PerformanceSummary).toBe(
        "Excellent performance! Your investments are doing great."
      );
    });

    it("should return correct performance for a modest gain", async () => {
      const response: Response = await request(app)
        .post("/api/v1/investment")
        .send({ initialInvestment: 1000, currentValue: 1100 })
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.profitOrLoss).toBe(100);
      expect(response.body.PerformanceSummary).toBe(
        "Solid gain. Keep monitoring your investments."
      );
    });

    it("should return correct performance for a loss", async () => {
      const response: Response = await request(app)
        .post("/api/v1/investment")
        .send({ initialInvestment: 1000, currentValue: 800 })
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.profitOrLoss).toBe(-200);
      expect(response.body.PerformanceSummary).toBe(
    "Significant loss. Immediate review recommended."
    );
    });

    it("should return 400 for invalid input", async () => {
      const response: Response = await request(app)
        .post("/api/v1/investment")
        .send({ initialInvestment: "abc", currentValue: "xyz" })
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "initialInvestment and currentValue must be numbers"
      });
    });

  });

});