const mongoose = require("mongoose");
const DATABASE_CONNECTION =
  "mongodb+srv://tvcdb:test123@travel-sathi-nepal-clus.a28kg.mongodb.net/Travel-Sathi-Nepal-Database?retryWrites=true&w=majority";
const connectToMongo = () => {
  mongoose
    .connect(DATABASE_CONNECTION)
    .then(() => {
      console.log("connected to Mongo Sucessfully");
    })
    .catch((err) => console.log("no connection"));
};
module.exports = connectToMongo;
