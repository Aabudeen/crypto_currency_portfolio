const MONGOOSE = require('mongoose');
require('dotenv').config()
const USER = new MONGOOSE.Schema({
    user_id: {
        unique: true,
        type: Number
    },
    "name": {
        type: String,
        require:true
    },
    "first_email": {
        type: String,
        require:true

    },
    "secound_email": {
        type: String,
        require:true

    },
    "password": {
        type: String,
        require:true
    },
    "reg_date":{
        type: Date,
        default: Date.now()
    },
    "status":{
        type: Number,
        default: 0
    },
    "trade_status":{
        type: Number,
        default: 1
    }

})

module.exports = MONGOOSE.model('USER', USER, process.env.DB_PRIFIX + '_USER')