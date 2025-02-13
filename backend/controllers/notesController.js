const Note = require('../models/Note');

exports.createNote = async (req, res) => {
  const { title, content, category } = req.body;
  try {
    const note = new Note({ title, content, category, user: req.userId });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOneAndUpdate(
      { _id: id, user: req.userId },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    await Note.findOneAndDelete({ _id: id, user: req.userId });
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};