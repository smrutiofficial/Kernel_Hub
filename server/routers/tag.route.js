const express = require("express");
const {
    createTag,
    getTags,
    updateTag,
    deleteTag,
} = require("../controllers/tags.controller");

const router = express.Router();
// Create a new tag
router.post("/", createTag);

// Get all tags
router.get("/", getTags);

// Update a specific tag by ID
router.put("/:id", updateTag);

// Delete a specific tag by ID
router.delete("/:id", deleteTag);

module.exports = router;