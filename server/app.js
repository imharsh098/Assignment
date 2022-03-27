import express from "express";
const app = express();

const port = 9000;
import "./connect.js";
import userRouter from "./controller/user/index.js";
app.use(express.json());
app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  res.send("<h1>Hello Everyone from Node via Nginx</h1>");
});

app.listen(port, () => {
  console.log("Server started at ", port);
});
