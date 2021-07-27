const express = require("express");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const router = require("./routes/index");
const PORT = process.env.PORT || 8080;

//HTTP request logger
app.use(morgan("tiny"));

app.use(express.json()); //To Convert into data into json format when comes from front end
// app.use(express.urlencoded({ extended: false })); //Make it 'false' to restrict goes into the nested objects
//Mongoose Connection
// const MONGODB_URI =
//   "mongodb+srv://admin:admin@clustertest.w5ksk.mongodb.net/mernapp?retryWrites=true&w=majority";

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/mernapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use("/api", router);
app.listen(PORT, console.log(`server running at port ${PORT}`));
