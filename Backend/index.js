require("dotenv").config();

const cookieParser = require("cookie-parser");
const cloudinary= require("cloudinary");
const connectToMongo = require("./db");
const express = require("express");
const app = express();
var cors = require("cors");
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser");

const errorMiddleware = require("./middleware/error");

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

connectToMongo();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Travel Sathi Nepal listening at http://localhost:${PORT}`);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(cors({origin: `http://localhost:3000`}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(fileUpload());
app.use("/user/auth", require("./routes/auth"));
app.use("/user/", require("./routes/user"));
app.use("/vehicle", require("./routes/vehicle"));
app.use("/order", require("./routes/order"));
app.use("/payment", require("./routes/payment"));



app.use(errorMiddleware);
// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
