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

const multer = require('multer')
const jwt = require('jsonwebtoken');

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

app.use(cors()) 
app.use(express.json())
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session(sessionConfig));


// ROUTES 
app.use('/category', require('./routes/category'))
app.use('/main-category', require('./routes/mainCategory'))
app.use('/customer', require('./routes/customer'))
app.use('/product', require('./routes/product'))
app.use('/product/productId', require('./routes/product'))
app.use('/wishlist', require('./routes/wishlist'))
app.use('/cart', authCheck, require('./routes/cart'))
app.use('/auth', require('./routes/auth/auth'))
app.use('/auth/login', require('./routes/auth/auth'))
app.use('/auth/register', require('./routes/auth/auth'))


// IMAGE STORAGE ENGINE
const storage = multer.diskStorage({
    destination: (req, files, cb) => {
        cb(null, "./upload/images")
    },
    filename: (req, file, callback) => {
        return callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}` )
    }
})

// pass fn to our disk config 
const upload = multer({ storage:storage }).array("product", 4)

//static endpoint
app.use('/images', express.static('upload/images'))


// endpoint to upload the images
app.post("/upload", upload, async (req, res) => {
    // will get and rename and store the image
    const files = req.files

    let images = []

    files.forEach((f) => {
        console.log(f, " --> this file")
        images.push(`http://localhost:${PORT}/images/${f.filename}`)
    })

    await res.json({
        success: true,
        image_url: images,
    })
})

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

