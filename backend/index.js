const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/users');

const app = express();

app.use(cors());
app.use(express.json());

try {
  mongoose.connect("mongodb://127.0.0.1:27017/K8Sproject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch (err) {
  console.error("Error connecting to MongoDB:", err.message);
}

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500);
  }
});

app.post("/createuser", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await UserModel.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404);
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
