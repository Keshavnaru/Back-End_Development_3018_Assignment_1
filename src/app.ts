import express, { Request, Response } from "express";
import { calculatePortfolioPerformance } from "./portfolioPerformance";

export const app = express();

// Middleware to parse JSON
app.use(express.json());

// Health check route
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
    version: "1.0.0",
  });
});

// Investment performance route (POST)
app.post("/api/v1/investment", (req: Request, res: Response) => {
  const { initialInvestment, currentValue } = req.body;

  // Validate input
  if (typeof initialInvestment !== "number" || typeof currentValue !== "number") {
    return res.status(400).json({ error: "initialInvestment and currentValue must be numbers" });
  }

  // Use the external function
  const portfolioResult = calculatePortfolioPerformance(initialInvestment, currentValue);

  // Round percentageChange to 2 decimals
  portfolioResult.percentageChange = parseFloat(portfolioResult.percentageChange.toFixed(2));

  res.status(200).json(portfolioResult);
});