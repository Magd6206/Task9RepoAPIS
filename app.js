require("dotenv").config();
console.log("Current PORT from ENV:", process.env.PORT);
const express = require("express");
const app = express();
app.use(express.json());
const {crews , shifts} = require("./data");
const morgan = require("morgan");
app.use(morgan("dev"));

app.use("/api/v1/crews" , require("./src/routers/crews.router"));
app.use("/api/v1/shifts" , require("./src/routers/shifts.router"));



const PORT = process.env.PORT
app.listen(PORT , () => {
    //http://localhost:3000/
  console.log(`Server is Running AS Port : ${PORT} ${process.env.username }`);
  
});