const { createbag, getBags } = require('../Controllers/AuthController')
const router = require('express').Router();

router.post('/surprisebag',createbag);
router.get('/getbags',getBags);

module.exports = router;