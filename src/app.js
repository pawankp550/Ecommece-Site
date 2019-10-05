const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieparser = require('cookie-parser')
const bodyParser = require('body-parser')
var cors = require('cors')


require('dotenv').config()
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')

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

// cors setting
app.use(cors())

// parse data from request body middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

// HTTP request logger middleware
app.use(morgan('dev'))

// cookie parser middleware
app.use(cookieparser())

// Routes
app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)

const PORT = process.env.port || 3000

app.listen(PORT, () => {
    console.log('server started')
})