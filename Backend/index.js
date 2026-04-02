const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv"); //import for data secure
const port = 3000;
dotenv.config();// initialize the .env and use all variables

const app = express();


//midware 
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

//midware 
app.use(express.json());



app.use("/uploads", express.static("uploads"));


// app.get("/", (req, res) => {
//   res.send("Backend Working ");
// });

// MongoDB Connect
// const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected "))
  .catch((err) => console.log(err));

// User Route to connect 
app.use("/api/auth", require("./routes/auth"));

//POSTS ROUTE CONNECT
app.use("/api/posts", require("./routes/posts"));


// SERVER  CONNECTION START
app.listen(port, () => console.log(`Server running on port ${port}`));