// const express = require("express");
import express from "express";
import morgan from "morgan";
import auth from "./_middleware/auth.js";
import studentRoutes from "./routes/students.routes.js";
import userRoutes from "./routes/auth.routes.js";
import utilRoutes from "./routes/util.routes.js";
import cors from "cors";
const app = express();

app.use(cors());
//Setting

const port = process.env.PORT_API || 4000;
app.set("port", port);
// Middlewares
app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

// User
app.use("/api/users", userRoutes);

//Routes
app.use("/api/students", studentRoutes);

app.use("/api/util", utilRoutes);

export default app;
