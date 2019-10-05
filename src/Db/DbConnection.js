const mongoose = require('mongoose')

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