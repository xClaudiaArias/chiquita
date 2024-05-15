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


// ROUTES 

app.use('/user', require('./routes/user'))
app.use('/products', require('./routes/product'))
app.use('/products/productId', require('./routes/product'))
app.use('/wishlist', require('./routes/wishlist'))
app.use('/cart', require('./routes/cart'))
app.use('/order', require('./routes/order'))
app.use('/cart/addToCart', require('./routes/cart'))
app.use('/cart/productId', require('./routes/cart'))
app.use('/auth', require('./routes/auth/auth'))
app.use('/auth/login', require('./routes/auth/auth'))
app.use('/auth/register', require('./routes/auth/auth'))
app.use('/users', require('./routes/user'))
app.use('/users/id', require('./routes/user'))
app.use('/users/stats', require('./routes/user'))
app.use('/checkout', require('./routes/stripe'))

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

