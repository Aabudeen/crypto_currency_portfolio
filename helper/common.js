const ENCRYPTION = require('./encrypeter');
const jwt = require('jsonwebtoken');


const generate_JWT = (payload) => {
    const encryptedPayload = ENCRYPTION.encrypt(JSON.stringify(payload));
    const token = jwt.sign({ data: encryptedPayload }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return token
}


const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ status: 0, message: "Access denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        let data=ENCRYPTION.decrypt(decoded.data)
        req.user = data;
        next();
    } catch (error) {
        console.log('error: ', error);
        return res.status(400).json({ status: 0, message: "Invalid token." });
    }
};




module.exports = { generate_JWT, authMiddleware}