import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotevn from "dotenv";

//Routes
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js"
const app = express();
dotevn.config();

app.use(bodyParser.json({ limit: "30mb", extended: "true" })); // for image
app.use(bodyParser.urlencoded({ lmit: "30mb", extended: "true" }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Memories API");
});
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server is running ${PORT}`)))
  .catch((error) => console.log(error));
