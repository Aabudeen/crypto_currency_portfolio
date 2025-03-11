require('dotenv').config()
const EXPRESS = require('express')
const APP = EXPRESS()
const HTTP = require('http')
const SERVER = HTTP.createServer(APP)
const PORT = process.env.PORT
const DB = require('./model/db')
const USER = require('./router/user')
const WALLET = require('./router/wallet')
const CURRENCY=require('./router/currecny')
const cookieParser = require('cookie-parser');
const cors = require("cors")
const path = require('path');


APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: false }));
APP.use(cookieParser());
APP.use(EXPRESS.static(path.join(__dirname, 'public'))); APP.get('/', (req, res) => {
    res.status(200).json({ status: 1, message: "Server running successfully" })
})
APP.use('/user', USER)
APP.use('/wallet',WALLET)
APP.use('/currency',CURRENCY)



SERVER.listen(PORT, () => console.log(`Server successfully connected ${PORT}`))

