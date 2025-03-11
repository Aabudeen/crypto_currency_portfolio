const Wallet = require('../model/wallet');

const deposit = async (req, res) => {
    try {
        const { currency, amount } = req.body;

        const user_id = "67ceab5493c55e29052b5df0";

        // req.user.id
        if (!currency || !amount || amount <= 0) {
            return res.status(400).json({ status: 0, message: "Invalid deposit details" });
        }

        let wallet = await Wallet.findOne({ user_id });

        if (!wallet) {
            wallet = new Wallet({ user_id, balances: {} });
        }

        if (!wallet.balances.has(currency)) {
            wallet.balances.set(currency, { amount: 0, hold: 0 }); // Initialize new currency
        }

        wallet.balances.get(currency).amount += amount;
        wallet.updated_at = new Date();
        await wallet.save();

        return res.status(200).json({ status: 1, message: `Deposited ${amount} ${currency}`, balances: wallet.balances });

    } catch (error) {
        console.error("Error in deposit:", error);
        return res.status(500).json({ status: 0, message: "Internal server error" });
    }
};


const getBalance = async (req, res) => {
    try {
        const user_id ="67ceab5493c55e29052b5df0";

        let wallet = await Wallet.findOne({ user_id });

        if (!wallet) {
            return res.status(404).json({ status: 0, message: "Wallet not found" });
        }

        return res.status(200).json({
            status: 1,
            message: "Wallet balance retrieved successfully",
            balances: wallet.balances
        });

    } catch (error) {
        console.error("Error fetching balance:", error);
        return res.status(500).json({ status: 0, message: "Internal server error" });
    }
};




module.exports = { deposit, getBalance }
