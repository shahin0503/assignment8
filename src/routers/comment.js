const express = require('express')
const admin = require('../firebase')
const router = new express.Router()

const db = admin.database()

router.post('/createComment', async (req, res) => {
    try {
        const { postId, content, author } = req.body
        const timestamp = admin.database.ServerValue.TIMESTAMP

        const commentData = {
            postId: postId,
            content: content,
            author: author,
            timestamp: timestamp
        }

        const commentsRef = db.ref('comments');
        const newCommentRef = commentsRef.push();
        await newCommentRef.set(commentData);

        res.status(200).send("Comment created successfully");
    } catch (error) {
        res.status(500).send("An error occurred, please try again later");
    }
})

router.get('/readComments/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;

        const commentsRef = db.ref('comments');

        const query = commentsRef.orderByChild('postId').equalTo(postId);
        const snapshot = await query.once('value');

        const comments = [];
        snapshot.forEach(childSnapshot => {
            const comment = childSnapshot.val();
            comments.push(comment);
        });

        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching comments");
    }
});

module.exports = router