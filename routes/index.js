const express = require('express')
const router = express.Router()

router.use('/auth',require("./googleAuth"));
router.use('/api',require("./api"));

module.exports = router;