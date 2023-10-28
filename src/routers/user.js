const express = require('express')
const admin = require('../firebase')
const router = new express.Router()

router.post('/signup', async (req, res) => {
    try {
        const {email, password} = req.body
        const userData = {
            email: email,
            password: password
        }
        const userResponse = await admin.auth().createUser(user);
        res.json(userResponse)
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }

})

router.post('/login', async (req, res) => {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password,
        };
        const userRecord = await admin.auth().getUserByEmail(user.email);

        await admin.auth().comparePassword(user.password, userRecord.passwordHash);

        res.json({ message: 'Login successful', user: userRecord });
    } catch (error) {

        res.status(401).json({ error: 'Invalid credentials' });
    }
});


module.exports = router