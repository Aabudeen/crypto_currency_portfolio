let redis = require('redis');

var dbIndex_0 // user name email mob no 

(async () => {
   
        dbIndex_0 = redis.createClient({
            socket: {
                host: '127.0.0.1',
                port: '6379'
            },
            database: 0
        },);
    

    dbIndex_0.on("error", (error) => console.error("sdfzxdfx", error));
    await dbIndex_0.connect();

})();

let redisSet = exports.redisSet = async ( key, values, callback) => {
        var valueIntoStringify = JSON.stringify(values)
        var ss = await dbIndex_0.set(key, valueIntoStringify)
        callback(ss)
}


let redisGet = exports.redisGet = async (key, callback) => {

        let redis_data_InString = await dbIndex_0.get(key)
        callback(redis_data_InString)
}