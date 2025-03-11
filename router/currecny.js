const EXPRESS = require('express'),
    ROUTER = EXPRESS.Router(),
    curreny = require('../controller/currency')

ROUTER.get('/get_price/:key', curreny.get_price)


module.exports = ROUTER
