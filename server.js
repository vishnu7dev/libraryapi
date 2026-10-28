

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const book = require("./models/book");

mongoose.connect(process.env.MONGO_URI);


app.post("/api/books", async (req, res) => {
  if (!req.body.title)
    return res.status(400).send("Title required");

  res.status(201).json(await book.create(req.body));
});


app.get("/api/books", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) ||5







  res.json({
    books: await book.find().skip((page - 1) * limit).limit(limit),
    currentPage: page,
    totalRecords: await book.countDocuments()
  });
});


app.patch("/api/books/:id", async (req, res) => {
  const book = await book.findByIdAndUpdate(
    req.params.id,
    { available: req.body.available },
    { new: true }
  );

  if (!book) return res.status(404).send("Book not found");
  res.json(book);
});

app.listen(3000, () => console.log("Server running on port 3000"));
