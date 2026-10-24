
const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/Note");

const router = express.Router();

// GET: Fetch all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

// GET: Fetch one note by ID
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch note" });
  }
});

// POST: Create a new note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (
      typeof title !== "string" ||
      typeof content !== "string" ||
      !title.trim() ||
      !content.trim()
    ) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const note = await Note.create({
      title: title.trim(),
      content: content.trim(),
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Failed to create note" });
  }
});

// PUT: Update an existing note
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const { title, content } = req.body;

    if (
      typeof title !== "string" ||
      typeof content !== "string" ||
      !title.trim() ||
      !content.trim()
    ) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: title.trim(),
        content: content.trim(),
      },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Failed to update note" });
  }
});

// DELETE: Delete a note
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note" });
  }
});

module.exports = router;
