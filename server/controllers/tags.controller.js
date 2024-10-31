const Tags = require("../models/Tags.model");

// Create a tag
const createTag = async (req, res) => {
  try {
    const { tagname } = req.body;
    const tag = new Tags({ tagname });
    await tag.save();
    res.status(201).json( tag);
  } catch (error) {
    res.status(500).json({ message: "Failed to create tag", error });
  }
};

// Get all tags
const getTags = async (req, res) => {
  try {
    const tag = await Tags.find();
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tags", error });
  }
};

// Update a specific tag
const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { tagname } = req.body;
    const  tag = await Tags.findByIdAndUpdate(id, { tagname }, { new: true });
    if (! tag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json( tag);
  } catch (error) {
    res.status(500).json({ message: "Failed to update tag", error });
  }
};

// Delete a specific tag
const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const  tag = await Tags.findByIdAndDelete(id);
    if (! tag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete tag", error });
  }
};

module.exports = {
  createTag,
  getTags,
  updateTag,
  deleteTag,
};
