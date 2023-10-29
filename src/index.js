const express = require('express')

const userRouter = require('./routers/user')
const blogRouter = require('./routers/blog')
const uploadRouter = require('./routers/imageupload')

const app = express()
app.use(express.json())
app.use(userRouter)
app.use(blogRouter)
app.use(uploadRouter)

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log('server is up on port ' + port)
}) 