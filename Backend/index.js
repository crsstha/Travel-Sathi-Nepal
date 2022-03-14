require("dotenv").config({ path: "Backend/config.env" });

const connectToMongo = require("./db");
const express = require("express");
const app = express();
var cors = require("cors");

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

app.use(cors());

connectToMongo();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/user/auth", require("./routes/auth"));
app.use("/user/", require("./routes/user"));
app.use("/vehicle", require("./routes/vehicle"));

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
