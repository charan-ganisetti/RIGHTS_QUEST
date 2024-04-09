const userInfo = require("../models/dataModel");

const levelstatus = async (req, res) => {
    try {
        const { email, level } = req.query;
        console.log(email)
        const user = await userInfo.findOne({ email });
        console.log(user[level])
        if (!user) {
            return res.status(404).json({ "msg": "User not found" });
        } else {
            return res.status(200).json({ "complete": user[level].complete });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ "msg": "Internal server error" });
    }
};

module.exports = levelstatus;
