import express, { Request, Response } from "express";
import { calculatePortfolioPerformance } from "./portfolioPerformance";

export const app = express();

app.use(express.json());

/**
 * Healthcheck endpoint
 */
app.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

/**
 * Portfolio calculation endpoint
 */
app.post("/portfolio", (req: Request, res: Response) => {

  const { initialInvestment, currentValue } = req.body;

  const result = calculatePortfolioPerformance(initialInvestment, currentValue);

  res.status(200).json(result);

});