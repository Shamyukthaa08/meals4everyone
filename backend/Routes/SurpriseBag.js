const { createbag } = require('../Controllers/AuthController')
const router = require('express').Router();

router.post('/surprisebag',createbag);

module.exports = router;