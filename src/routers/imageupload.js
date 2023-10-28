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

router.post("/upload", upload.single("image"), async (req, res) => {
  const { file } = req;

    if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const destination = "images/" + file.originalname;

  try {
    await bucket.upload(file.path, {
      destination: destination,
      metadata: {
        contentType: file.mimetype,
      },
    });
    
    res.status(200).send("Image uploaded successfully.");
  } catch (error) {
    
    res.status(500).send("Error uploading image.");
  }
});

module.exports = router;