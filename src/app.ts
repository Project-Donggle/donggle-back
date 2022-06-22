import express from "express";

const app: express.Application = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("test page");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);
});
