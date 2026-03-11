export interface PortfolioResult {
  initialInvestment: number;
  currentValue: number;
  profitOrLoss: number;
  percentageChange: number;
  PerformanceSummary: string;
}

export function calculatePortfolioPerformance(
  initialInvestment: number,
  currentValue: number
): PortfolioResult {

  const profitOrLoss = currentValue - initialInvestment;
  const percentageChange = (profitOrLoss / initialInvestment) * 100;

  let PerformanceSummary = "";

  if (percentageChange >= 30) {
    PerformanceSummary = "Excellent performance! Your investments are doing great.";
  } else if (percentageChange >= 10) {
    PerformanceSummary = "Solid gain. Keep monitoring your investments.";
  } else if (percentageChange > 0) {
    PerformanceSummary = "Modest gain. Your portfolio is growing slowly.";
  } else if (percentageChange === 0) {
    PerformanceSummary = "No change. Your portfolio is holding steady.";
  } else if (percentageChange > -10) {
    PerformanceSummary = "Minor loss. Consider reviewing your investments.";
  } else {
    PerformanceSummary = "Significant loss. Immediate review recommended.";
  }

  return {
    initialInvestment,
    currentValue,
    profitOrLoss,
    percentageChange,
    PerformanceSummary
  };
}