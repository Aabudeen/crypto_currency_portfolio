const mongoose = require('mongoose');
require('dotenv').config()

const WalletSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CT_USER', required: true, unique: true },
    balances: { 
        type: Map,
        of: { 
            amount: { type: Number, default: 0 },
            hold: { type: Number, default: 0 }
        }
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WALLET', WalletSchema, process.env.DB_PRIFIX + '_WALLET')
