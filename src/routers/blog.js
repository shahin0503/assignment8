const express = require('express')
const admin = require('../firebase')
const router = new express.Router()

const db = admin.firestore()


router.post('/create', async (req, res) => {
    try {
        const {title, content, author} = req.body
        timestamp = admin.firestore.FieldValue.serverTimestamp()
        const blogData = {
            title: title,
            content: content,
            author: author,
            timestamp: timestamp
        };
        const response = await db.collection("blogs").add(blogData);
        res.send(response);
    } catch (error) {
        res.status(500).send("An error occurred, please try again later");
    }
})

router.get('/read/all', async (req, res) => {
    try {
        const blogsRef = db.collection("blogs");
        const response = await blogsRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data())
        });
        res.send(responseArr)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router