import { describe, it, expect } from "@jest/globals";
import { calculatePortfolioPerformance, PortfolioResult } from "../src/portfolioPerformance";

describe("calculatePortfolioPerformance", () => {

  it("should return Excellent performance for >= 30% gain", () => {
    const result: PortfolioResult = calculatePortfolioPerformance(1000, 1400);
    expect(result.profitOrLoss).toBe(400);
    expect(result.percentageChange).toBe(40);
    expect(result.PerformanceSummary).toBe("Excellent performance! Your investments are doing great.");
  });

  it("should return Solid gain for >= 10% and < 30% gain", () => {
    const result: PortfolioResult = calculatePortfolioPerformance(1000, 1150);
    expect(result.profitOrLoss).toBe(150);
    expect(result.percentageChange).toBe(15);
    expect(result.PerformanceSummary).toBe("Solid gain. Keep monitoring your investments.");
  });

  it("should return Modest gain for > 0% and < 10% gain", () => {
    const result: PortfolioResult = calculatePortfolioPerformance(1000, 1050);
    expect(result.profitOrLoss).toBe(50);
    expect(result.percentageChange).toBe(5);
    expect(result.PerformanceSummary).toBe("Modest gain. Your portfolio is growing slowly.");
  });

  it("should return No change for 0% change", () => {
    const result: PortfolioResult = calculatePortfolioPerformance(1000, 1000);
    expect(result.profitOrLoss).toBe(0);
    expect(result.percentageChange).toBe(0);
    expect(result.PerformanceSummary).toBe("No change. Your portfolio is holding steady.");
  });

  it("should return Minor loss for > -10% and < 0% loss", () => {
    const result: PortfolioResult = calculatePortfolioPerformance(1000, 950);
    expect(result.profitOrLoss).toBe(-50);
    expect(result.percentageChange).toBe(-5);
    expect(result.PerformanceSummary).toBe("Minor loss. Consider reviewing your investments.");
  });

  it("should return Significant loss for <= -10% loss", () => {
    const result: PortfolioResult = calculatePortfolioPerformance(1000, 850);
    expect(result.profitOrLoss).toBe(-150);
    expect(result.percentageChange).toBe(-15);
    expect(result.PerformanceSummary).toBe("Significant loss. Immediate review recommended.");
  });

});
