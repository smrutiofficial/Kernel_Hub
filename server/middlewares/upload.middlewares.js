const multer = require("multer");
const path = require("path");

// Configure multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../public/temp'); // Adjusted path
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filePath = `${uniqueSuffix}${path.extname(file.originalname)}`;
    console.log(`File path: ${filePath}`); // Log the file path
    cb(null, filePath);
  },
});


// File filter to ensure only images are uploaded
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

// Initialize multer with the storage and file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: fileFilter,
});

module.exports = { upload };
