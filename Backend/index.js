const connectToMongo = require("./db");
const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());

connectToMongo();
const port = 5000;

app.use(express.json());
app.use("/user/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
