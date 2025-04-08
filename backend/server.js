const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./Routes/userRoutes");
dotenv.config();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected Successfully!");
    const PORT = process.env.PORT || 5000; // Standardize to 5000
    app.listen(PORT, (err) => {
      if (err) console.log(err);
      console.log("running successfully at port", PORT);
    });
  })
  .catch((error) => {
    console.log("error", error);
  });

app.use("/", userRoute); // Explicitly mount at root path