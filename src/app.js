const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieparser = require('cookie-parser')

require('dotenv').config()
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

// database connection
mongoose.connect(process.env.DataBaseString, { useNewUrlParser: true,
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

// parse data from request body middleware
app.use(express.json())

// HTTP request logger middleware
app.use(morgan('dev'))

// cookie parser middleware
app.use(cookieparser())

// user Route
app.use('/api', authRouter)
app.use('/api', userRouter)

const PORT = process.env.port || 3000

app.listen(PORT, () => {
    console.log('server started')
})