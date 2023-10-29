const express = require('express')
const admin = require('../firebase')
const router = new express.Router()
const { Storage } = require("@google-cloud/storage");


const storage = new Storage({
  projectId: "assignment8-ba343",
  keyFilename: "./key.json", 
});

const bucket = storage.bucket(admin.app().options.storageBucket);
const db = admin.firestore()
const realtimeDb = admin.database()

// Create a new blog
router.post('/blog', async (req, res) => {
    try {
        const {title, content, author, uid} = req.body
        timestamp = admin.firestore.FieldValue.serverTimestamp()
        const blogData = {
            title: title,
            content: content,
            author: author,
            uid: uid,
            timestamp: timestamp
        };
        const response = await db.collection("blogs").add(blogData);
        res.send(response);
    } catch (error) {
        res.status(500).send("An error occurred, please try again later");
    }
})

// Get all blogs
router.get('/blog', async (req, res) => {
    try {
        const blogsRef = db.collection("blogs");
        const response = await blogsRef.get();
        let responseArr = [];
        response.forEach(doc => {
            const blogData = doc.data()
            responseArr.push({id: doc.id, ...blogData})
        });
        res.send(responseArr)
    } catch (error) {
        res.send(error)
    }
})

// Get a blog details
router.get('/blog/:blogId', async (req, res) => {
    try {
        const blogsRef = db.collection("blogs");
        const blogId = req.params.blogId;
        const blogDoc = await blogsRef.doc(blogId).get();
        if (blogDoc.exists) {
            const blogData = blogDoc.data();
            const commentsRef = realtimeDb.ref('comments');

            const query = commentsRef.orderByChild('postId').equalTo(blogId);
            const snapshot = await query.once('value');
            const comments = [];
            snapshot.forEach(childSnapshot => {
                const comment = childSnapshot.val();
                comments.push(comment);
            });

             // Check if an image with the same postId exists
            const files = await bucket.getFiles({
                prefix: `images/${blogId}_`,
            });
            let imageDownloadURL = null
            if (files[0].length > 0) {
            // If an image with the postId exists, get the download URL
            const imageFile = files[0][0];
            imageDownloadURL = await imageFile.getSignedUrl({
                action: 'read',
                expires: '03-01-2500', // Set an appropriate expiration date
            }); 
            imageDownloadURL = imageDownloadURL[0]
        }
                res.send({id: blogId, comments, ...blogData, imageDownloadURL});
          } else {
            res.status(404).send('Blog not found');
          }
    
    } catch (error) {
        console.log(error)
        res.status(500).send("An error occured, please try again later")
    }
})

// Create a new comment
router.post('/blog/:blogId/comments', async (req, res) => {
    try {
        const { content, author } = req.body
        const timestamp = admin.database.ServerValue.TIMESTAMP

        const commentData = {
            postId: req.params.blogId,
            content: content,
            author: author,
            timestamp: timestamp
        }

        const commentsRef = realtimeDb.ref('comments');
        const newCommentRef = commentsRef.push();
        await newCommentRef.set(commentData);

        res.status(200).send("Comment created successfully");
    } catch (error) {
        console.log(error)
        res.status(500).send("An error occurred, please try again later");
    }
})

module.exports = router