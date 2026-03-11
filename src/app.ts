import express from "express";

const app = express();

app.use(express.json());

/**
 * Health Check Endpoint
 * GET /api/v1/health
 */
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

export default app;