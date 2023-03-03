const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const models = require("./models");
const jwt = require("jsonwebtoken");
const sendEmail = require("./mailer");
const User = models.User;
const Note = models.Note;

const app = express();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
mongoose.connect(process.env.URI, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("open", function () {
  console.log("Connected to database successfully!");
});

db.on("error", function (error) {
  console.log("Error connecting to database:", error);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("Incorrect email or password");
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid)
    return res.status(401).send("Incorrect email or password");
  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: 86400,
  });
  res.send({ token });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({
      name,
      email,
      password,
    });

    await user.save();
    await sendEmail(
      email,
      "Thank you for registering",
      `Dear ${name}, thank you for registering to our website!`
    );
    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/createnote", async (req, res) => {
  const { title, content } = req.body;
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send("Access denied. No token provided.");
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).send("Invalid Token1.");
    const note = new Note({
      user: user._id,
      title,
      content,
    });
    await note.save();
    res.send(note);
  } catch (ex) {
    res.status(400).send(ex);
  }
});

app.get("/notes", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send("Access denied. No token provided.");
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).send("Invalid Token.");
    const notes = await Note.find(
      { user: user._id },
      { title: 1, content: 1, noteId: 1 }
    ).sort({ date: -1 });
    res.send(notes);
  } catch (ex) {
    res.status(400).send("Invalid Token.");
  }
});

app.patch("/notes/:id", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send("Access denied. No token provided.");

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const id = req.params.id;
    const note = await Note.findOne({ noteId: id });
    if (!note) return res.status(404).send("Note not found");

    if (note.user.toString() !== decoded.id) {
      return res.status(401).send("Unauthorized");
    }

    if (req.body.title) note.title = req.body.title;
    if (req.body.content) note.content = req.body.content;

    await note.save();

    return res.status(200).send(note);
  } catch (ex) {
    return res.status(400).send("Invalid Token.");
  }
});

app.delete("/notes/:id", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send("Access denied. No token provided.");

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const id = req.params.id;
    const note = await Note.findOne({ noteId: id });
    if (!note) return res.status(404).send("Note not found");
    if (note.user.toString() !== decoded.id)
      return res.status(403).send("Access forbidden");

    await note.remove();
    return res.status(200).send("Note deleted successfully");
  } catch (ex) {
    return res.status(400).send("Invalid Token.");
  }
});

app.get("/name", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send("Access denied. No token provided.");
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).send("Invalid Token.");
    res.send({ name: user.name });
  } catch (ex) {
    res.status(400).send("Invalid Token.");
  }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
