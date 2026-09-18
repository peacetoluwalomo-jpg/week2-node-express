import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT || 3000);
const publicDirectory = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "public",
);

if (!Number.isInteger(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${process.env.PORT}"`);
}

// Bonus: log every request after its response completes.
app.use((req, res, next) => {
  const startedAt = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startedAt;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
    );
  });

  next();
});

app.use(express.json());

const apiRouter = express.Router();

apiRouter.use(express.static(publicDirectory));

apiRouter.post("/user", (req, res) => {
  const { name, email } = req.body ?? {};

  if (!name || !email) {
    res.status(400).json({ error: "Both name and email are required." });
    return;
  }

  res.send(`Hello, ${name}!`);
});

apiRouter.get("/user/:id", (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

apiRouter.get("/healthz", (_req, res) => {
  res.json({ status: "ok" });
});

// Support both the assignment's direct routes and the managed /api preview.
app.use("/api", apiRouter);
app.use("/", apiRouter);

app.use((err, _req, res, next) => {
  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    err.body !== undefined
  ) {
    res.status(400).json({ error: "Invalid JSON." });
    return;
  }

  next(err);
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(port, () => {
  console.log(`Week 2 API listening on port ${port}`);
});