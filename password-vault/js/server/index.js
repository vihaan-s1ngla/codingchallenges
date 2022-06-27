import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.post("/api/register", async (req, res) => {
  const { username: inputtedUsername, password: inputtedPassword } = req.body;
  const hashedPassword = await bcrypt.hash(inputtedPassword, 10);

  User.findOne({ username: inputtedUsername }).then(async (result) => {
    if (result) {
      res.json({
        status: "error",
        error: "An account with that username already exists.",
      });
    } else if (!result) {
      const user = await User.create({
        username: inputtedUsername,
        password: hashedPassword,
      });
      res.json({ status: "ok" });
    }
  });
});

app.post("/api/login", async (req, res) => {
  const { username: inputtedUsername, password: inputtedPassword } = req.body;
  const user = await User.findOne({
    username: inputtedUsername,
  });

  if (user) {
    if (await bcrypt.compare(inputtedPassword, user.password)) {
      const token = jwt.sign(
        {
          username: user.username,
          password: user.password,
        },
        process.env.JWT_SECRET
      );
      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ status: "error", user: false });
    }
  } else {
    return res.json({ status: "error", user: false });
  }
});

app
  .route("/api/vault")
  .get(async (req, res) => {
    const token = req.headers["x-access-token"];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const username = decoded.username;
      const user = await User.findOne({ username, username });

      return res.json({
        status: "ok",
        username: user.username,
        vault: user.vault,
      });
    } catch (err) {
      console.log(err);
      res.json({ status: "error", error: "invalid token" });
    }
  })
  .post(async (req, res) => {
    const token = req.headers["x-access-token"];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const username = decoded.username;
      await User.updateOne(
        { username, username },
        {
          $set: {
            vault: req.body.vault,
          },
        }
      );

      return res.json({ status: "ok" });
    } catch (err) {
      res.json({ status: "error", error: "invalid token" });
    }
  });

app.listen(3001, () => console.log("Server started on port 3001."));
