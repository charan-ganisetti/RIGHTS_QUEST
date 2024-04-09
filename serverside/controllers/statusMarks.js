const userInfo = require("../models/dataModel");

const statusMarks = async (req, res) => {
    try {
        // Retrieve user information from the database
        const email = req.body.email;
        const user = await userInfo.findOne({ email });
        console.log(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Calculate total marks for each level
        const level1TotalMarks = (user.level1.RightToEquality + user.level1.Rightagainstdiscrimination) / 4;
        const level2TotalMarks = (user.level2.RightToEducation + user.level2.RightToFreedomOfSpeechAndExpresstion) / 4;
        const level3TotalMarks = (user.level3.RightAgainstChildLabor + user.level3.RightToIdentity) / 4;
        const level4TotalMarks = (user.level4.RightToBeProtectedFromTrafficking + user.level4.RightToLifeAndPersonalLiberty) / 4;
        const level5TotalMarks = (user.level5.RightToBeProtectedAgainstAbuse + user.level5.ProhibitionOfChildMarriages) / 4;

        // Send response with total marks for each level
        res.status(200).json({
            level1: level1TotalMarks,
            level2: level2TotalMarks,
            level3: level3TotalMarks,
            level4: level4TotalMarks,
            level5: level5TotalMarks
        });
    } catch (error) {
        console.error("Error retrieving user information:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = statusMarks;
