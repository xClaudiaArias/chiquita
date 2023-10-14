const express = require('express');
const router = express.Router()

const path = require('path') // from nodejs

// regex (router recognizes regex)
// ^ : beginning of string ONLY
// $: end of string ONLY
// user can "| OR" request the index as well

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router