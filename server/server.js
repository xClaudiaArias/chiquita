require('dotenv').config()
const express = require('express');
const app = express();

// dependencies 
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')

//db connection 
const connectDB = require('./config/dbConn')

const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connectDB()

// ------


app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, 'public')))

// ROUTES 

app.use('/customers', require('./routes/customer'))
app.use('/admin', require('./routes/admin'))
app.use('/card', require('./routes/card'))

// ERROR PAGE

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

// mongoose connection

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    // connect and start server 
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

// mongoose err
mongoose.connection.on('error', err => {
    console.log(err)
})

