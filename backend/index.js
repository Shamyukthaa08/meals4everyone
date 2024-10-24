const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const SurpriseBag = require('./Routes/SurpriseBag')

require('dotenv').config();
require('./Models/db');


const PORT = process.env.PORT || 8080;


app.get('/ping', (req,res)=>{
    res.send('PONG');
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter );
app.use('/admin', SurpriseBag);


app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
})