const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const PORT = 3080;

app.use(cors());

// routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();
mongoose.connect(process.env.MONGO_URL);

app.use(express.json());
// app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
// app.use(logger);

app.get("/", (req, res) => {
  console.log("arrived");
  res.send({ first: "posts" });
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

// things missing:
// hide password when sending it to mongo
//
