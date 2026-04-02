const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

//  CORS (Netlify + local)
app.use(cors({
  origin: true,
  credentials: true
}));

//  Middleware
app.use(express.json());

//  Static folder (for images)
app.use("/uploads", express.static("uploads"));

//  MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected "))
  .catch((err) => console.log("Mongo Error ", err));


  app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src * 'self' data: blob: 'unsafe-inline' 'unsafe-eval';"
  );
  next();
});

//  Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));

//  Default route (for testing)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

//  PORT (ONLY ONCE)
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

