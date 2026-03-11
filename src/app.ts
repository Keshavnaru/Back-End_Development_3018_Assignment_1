import express, {Express, Request, Response} from 'express';

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("API is working!");
});

app.get("api/v1/health",(req: Request, res: Response) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
     });
    });

export default app;