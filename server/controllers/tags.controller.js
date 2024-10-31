const Tags = require("../models/Tags.model");

// Create a tag
const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    const tagname = new Tags({ name });
    await tagname.save();
    res.status(201).json( tagname);
  } catch (error) {
    res.status(500).json({ message: "Failed to create tag", error });
  }
};

// Get all tags
const getTags = async (req, res) => {
  try {
    const tagname = await Tags.find();
    res.status(200).json(tagname);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tags", error });
  }
};

// Update a specific tag
const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const  tagname = await Tags.findByIdAndUpdate(id, { name }, { new: true });
    if (! tagname) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json( tagname);
  } catch (error) {
    res.status(500).json({ message: "Failed to update tag", error });
  }
};

// Delete a specific tag
const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const  tagname = await Tags.findByIdAndDelete(id);
    if (! tagname) return res.status(404).json({ message: "Tag not found" });
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
