const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const userRouter = require('./routes/user')

console.log(process.env.DataBaseString)
// database connection
mongoose.connect('mongodb+srv://pawan:Mongo@12345@cluster0-mbujf.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('db connected')
    })
    .catch((e) => {
        console.log(e)
    })

// user Route
app.use('/api', userRouter)

const PORT = process.env.port || 3000

app.listen(PORT, () => {
    console.log('server started')
})