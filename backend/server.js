require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notes Application API is running!");
});
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
