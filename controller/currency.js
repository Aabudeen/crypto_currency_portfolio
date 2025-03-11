const cron = require("node-cron");
const redisClient = require("../model/redis");
const axios = require("axios");
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price";

// Define the list of cryptocurrencies to fetch
const cryptoSymbols = ["bitcoin", "ethereum", "dogecoin", "solana", "ripple"];

// Schedule cron to run once every day at midnight
cron.schedule("0 0 * * *", async () => {
    await fetchCryptoPrices(cryptoSymbols);
}, {
    scheduled: true,
    timezone: "UTC"
});





const fetchCryptoPrices = async (symbols) => {
    try {
        const response = await axios.get(COINGECKO_API_URL, {
            params: {
                ids: symbols.join(","), // Convert array to comma-separated string
                vs_currencies: "usd"
            }
        });
        const prices = response.data;
        for (const symbol of Object.keys(prices)) {
            await redisClient.redisSet(`${symbol}`, JSON.stringify(prices[symbol]), (set_res) => {
                console.log('set_res: ', set_res);
            });
        }
        return prices;
    } catch (error) {
        throw new Error("Failed to fetch crypto prices");
    }
};


module.exports.get_price = async (req, res) => {
    try {
        const key = req.params.key;
        redisClient.redisGet(key, (data) => {
            if (!data) {
                return res.status(404).json({ status: 0, message: "Key not found in Redis" });
            }
            res.json({ status: 1, key, data });
        })
       
    } catch (error) {
        return res.status(500).json({ status: 0, message: "Internal server error. Please try again later." });
    }
}





