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

app.use('/admin', require('./routes/admin'))
app.use('/billing', require('./routes/billing'))
app.use('/card', require('./routes/card'))
app.use('/cart', require('./routes/cart'))
app.use('/category', require('./routes/category'))
app.use('/customers', require('./routes/customer'))
app.use('/order', require('./routes/order'))
app.use('/order-item', require('./routes/orderItem'))
app.use('/payment', require('./routes/payment'))
app.use('/product', require('./routes/product'))
app.use('/shipment', require('./routes/shipment'))
app.use('/wishlist', require('./routes/wishlist'))
// ---------- auth 
app.use('/admin-auth', require('./routes/auth/adminAuth'))
app.use('/admin-auth/login', require('./routes/auth/adminAuth'))
app.use('/admin-auth/register', require('./routes/auth/adminAuth'))
app.use('/customer-auth', require('./routes/auth/customerAuth'))
app.use('/customer-auth/login', require('./routes/auth/customerAuth'))
app.use('/customer-auth/register', require('./routes/auth/customerAuth'))

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

