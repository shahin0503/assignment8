const express = require("express");
const admin = require('../firebase');
const { Storage } = require("@google-cloud/storage");
const router = new express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const storage = new Storage({
  projectId: "assignment8-ba343",
  keyFilename: "./key.json", 
});

const bucket = storage.bucket(admin.app().options.storageBucket);

// Add or update an image to a blog
router.post("/upload/:postId", upload.single("image"), async (req, res) => {
  const { file } = req;
  const { postId } = req.params;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const destination = `images/${postId}_${file.originalname}`;

  try {
    // Check if an image with the same postId exists
    const existingFiles = await bucket.getFiles({
      prefix: `images/${postId}_`,
    });

    if (existingFiles[0].length > 0) {
      // If an image with the same postId exists, update it
      const existingFile = existingFiles[0][0];
      await existingFile.delete(); // Delete existing image

      // Upload the new image
      await bucket.upload(file.path, {
        destination: destination,
        metadata: {
          contentType: file.mimetype,
        },
      });
    } else {
      // If no image with the same postId exists, create a new entry
      await bucket.upload(file.path, {
        destination: destination,
        metadata: {
          contentType: file.mimetype,
        },
      });
    }

    res.status(200).send("Image uploaded successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading image.");
  } 
});

module.exports = router;
