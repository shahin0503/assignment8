const admin = require('firebase-admin')
const credentials = require('../key.json')

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: "http://assignment8-ba343-default-rtdb.asia-southeast1.firebasedatabase.app"
})

module.exports = admin