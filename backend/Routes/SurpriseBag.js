const { createbag, getBags, updateBag, getBagsByName } = require('../Controllers/AuthController')
const router = require('express').Router();

router.post('/surprisebag',createbag);
router.get('/getbags',getBags);
router.put('/updatebag/:id',updateBag );
router.get('/getbags/:name', getBagsByName);


module.exports = router;