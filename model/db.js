const MONGOOSE = require('mongoose')
const DB_CONNECTION = "mongodb://localhost:27017/CRYPTO-TASK"
MONGOOSE.connect(DB_CONNECTION)
    .then(() => console.log("DB connected successfully"))
    .catch((e) => console.log("Error in connect database"))

    


module.exports = MONGOOSE