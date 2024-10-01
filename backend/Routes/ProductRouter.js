const ensureAuthenticated = require('../Middlewares/Auth');
const ensureAdmin = require('../Middlewares/EnsureAdmin');
const router = require('express').Router();

router.get('/user', ensureAuthenticated, (req,res)=>{
    console.log('------ logged in user detail -----', req.user);
    res.status(200).json([
        {
            name:"mobile",
            price:10000
        },{
            name:"tv",
            price:20000
        }
    ])
})

router.get('/admin', ensureAuthenticated, ensureAdmin, (req,res)=>{
    console.log('------logged in as admin-----', req.user);
    res.status(200).json([{
        name:'Ford',
        price:10000
    },
    {
    name:'Honda',
    price:10000000
    }
    ])
})


module.exports = router;