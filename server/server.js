require('dotenv').config();
const express = require('express');
const app = express();

// dependencies 
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const fileURLToPath = require('url');
const dirname = require('path');
const bodyParser = require('body-parser');
const authCheck = require('./middleware/auth-check');

//db connection 
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')

// session 
const sessionConfig = {
    name: process.env.NAME,
    secret: process.env.SECRET,
    cookie: { 
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true //means no access from javascript hackers
    }, // 1 week
    resave: false, // resave every time you go back and forth??
    saveUninitialized: true // GDPR laws requires this to be false because user has to give consent
};

//port 
const PORT = process.env.PORT || 3500
const mode = process.env.NODE_ENV

console.log(mode, process.env.NAME, process.env.SECRET)

connectDB()

// ------


app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session(sessionConfig));
app.use(authCheck)

// ROUTES 

// app.use('/admin', require('./routes/admin'))
// app.use('/billing', require('./routes/billing'))
// app.use('/card', require('./routes/card'))
// app.use('/cart', require('./routes/cart'))
// app.use('/gallery', require('./routes/gallery'))
app.use('/customers', require('./routes/customer'))
// app.use('/order', require('./routes/order'))
// app.use('/order-item', require('./routes/orderItem'))
// app.use('/payment', require('./routes/payment'))
// app.use('/product', require('./routes/product'))
// app.use('/shipment', require('./routes/shipment'))
app.use('/wishlist', require('./routes/wishlist'))
// ---------- auth 
// app.use('/admin-auth', require('./routes/auth/adminAuth'))
// app.use('/admin-auth/login', require('./routes/auth/adminAuth'))
// app.use('/admin-auth/register', require('./routes/auth/adminAuth'))
// app.use('/customer-auth', require('./routes/auth/customerAuth'))
// app.use('/customer-auth/login', require('./routes/auth/customerAuth'))
// app.use('/customer-auth/register', require('./routes/auth/customerAuth'))

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

