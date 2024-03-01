import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { uploadRouter } from "./routes/upload.router";
import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.json("Welcome on XLS reader server");
});

app.use("/upload", uploadRouter);

const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.status || 500).json({
    message: err.message || "Unknown error",
    status: err.status || 500,
  });
};

app.use(errorHandler);

app.listen(3000, () => console.log("Server started on port 3000"));
