const CRYPTOJS = require('crypto-js');
const BCRYPT = require('bcrypt');
const KEY = CRYPTOJS.enc.Utf8.parse(process.env.KEY);
const IV = CRYPTOJS.enc.Utf8.parse(process.env.IV);



// AES Encryption
const encrypt = (value) => {
    return CRYPTOJS.AES.encrypt(value, KEY, { iv: IV }).toString();
};

// AES Decryption
const decrypt = (value) => {
    const bytes = CRYPTOJS.AES.decrypt(value, KEY, { iv: IV });
    return bytes.toString(CRYPTOJS.enc.Utf8);
};

// Generate Hashed Password
const genrate_pass = async (value) => {
    try {
        const saltRounds = parseInt(process.env.SALT) || 10;
        return await BCRYPT.hash(value, saltRounds);
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error;
    }
};

// Compare Password
const compare_pass = async (value, hash) => {
    try {
        return await BCRYPT.compare(value, hash);
    } catch (error) {
        console.error("Error comparing passwords:", error);
        throw error;
    }
};

module.exports = {
    encrypt,
    decrypt,
    genrate_pass,
    compare_pass,
};
