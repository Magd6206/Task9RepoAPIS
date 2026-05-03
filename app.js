require("dotenv").config();
console.log("Current PORT from ENV:", process.env.PORT);
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const morgan = require("morgan");
app.use(morgan("dev"));

app.use("/api/v1/crews" , require("./src/routers/crews.router"));
app.use("/api/v1/shifts" , require("./src/routers/shifts.router"));

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

mongoose
.connect(MONGO_URI)
.then(() => {
  console.log("Connected For Mongo DB");
  
  app.listen(PORT , () => {
    //http://localhost:3000/
  console.log(`Server is Running AS Port : ${PORT} ${process.env.username }`);
  
});
})
.catch((err) => {
  console.log("Error connecting to MongoDB:", err);
});