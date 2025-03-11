const EXPRESS = require('express'),
    ROUTER = EXPRESS.Router(),
    USER = require('../controller/user')
    
ROUTER.post('/register', USER.register)
ROUTER.post('/activate_user', USER.activateUser)
ROUTER.post('/login', USER.login)

module.exports = ROUTER


