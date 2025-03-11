
const { Validator } = require('node-input-validator');
const USER = require('../model/user');
const ENCRYPTION = require('../helper/encrypeter');
const COMMON = require('../helper/common')
const register = async (req, res) => {
    try {
        const v = new Validator(req.body, {
            name: 'required|minLength:6|maxLength:12',
            email: 'required|email',
            password: 'required|minLength:8|maxLength:16',
        });

        const matched = await v.check();
        if (!matched) {
            const errorMessages = Object.values(v.errors).map(err => err.message).join(', ');
            return res.status(400).json({
                status: 0,
                responseCode: 'fail',
                responseName: 'Validation Error',
                message: errorMessages,
            });
        }

        const { name, email, password } = req.body;

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!?])[A-Za-z\d@#$%^&*!?]{8,16}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                status: 0,
                message: "Password must contain at least 1 uppercase letter, 1 special character, and 1 number (8-16 characters long).",
            });
        }

        const first_email = ENCRYPTION.encrypt(email.toLowerCase().substring(0, 6));
        const second_email = ENCRYPTION.encrypt(email.toLowerCase().substring(6));

        const existingUser = await USER.findOne({ first_email, secound_email: second_email });
        if (existingUser) {
            return res.status(409).json({ status: 0, message: "User with this email already exists." });
        }

        const hashedPassword = await ENCRYPTION.genrate_pass(password);

        const newUser = {
            name,
            first_email,
            secound_email: second_email,
            password: hashedPassword,
        };

        await USER.create(newUser);
        return res.status(201).json({ status: 1, message: "User registered successfully." });

    } catch (error) {
        return res.status(500).json({ status: 0, message: "Internal server error. Please try again later." });
    }
};

const activateUser = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ status: 0, message: "Email is required." });
        }

        const first_email = ENCRYPTION.encrypt(email.toLowerCase().substring(0, 6));
        const second_email = ENCRYPTION.encrypt(email.toLowerCase().substring(6));

        const user = await USER.findOne({ first_email, secound_email: second_email });

        if (!user) {
            return res.status(404).json({ status: 0, message: "User not found." });
        }

        if (user.status === 1) {
            return res.status(400).json({ status: 0, message: "User is already active." });
        }

        user.status = 1;
        await user.save();

        return res.status(200).json({ status: 1, message: "User activated successfully." });

    } catch (error) {
        console.error("Error activating user:", error);
        return res.status(500).json({ status: 0, message: "Internal server error. Please try again later." });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: 0, message: "Email and password are required." });
        }

        const first_email = ENCRYPTION.encrypt(email.toLowerCase().substring(0, 6));
        const second_email = ENCRYPTION.encrypt(email.toLowerCase().substring(6));

        const user = await USER.findOne({ first_email, secound_email: second_email });

        if (!user) {
            return res.status(404).json({ status: 0, message: "User not found." });
        }

        const isMatch = await ENCRYPTION.compare_pass(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: 0, message: "Invalid credentials." });
        }

        if (user.status !== 1) {
            return res.status(403).json({ status: 0, message: "Account is not active. Please activate your account." });
        }

        const payload = {
            id: user._id,
            email: email,
            status: user.status
        };

        const token=COMMON.generate_JWT(payload)

        return res.status(200).json({ status: 1, message: "Login successful", token });

    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ status: 0, message: "Internal server error. Please try again later." });
    }
};



module.exports = { register, activateUser,login };
