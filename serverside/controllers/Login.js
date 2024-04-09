const userInfo = require("../models/dataModel");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await userInfo.findOne({ email });
        if (!user) {
            // User not found, create a new user
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
            await userInfo.create({ email, password: hashedPassword }); // Store the new user in the database
            return res.status(200).json("User created successfully");
        }

        // User found, compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {

            return res.status(401).json("Invalid password");

        }

        res.status(200).json("Login successful");
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");
    }
}

module.exports = login;
