const userInfo = require("../models/dataModel");

const updateScore = async (req, res) => {
    const { email, level, quizHeading, score } = req.body;
    console.log(score);
    console.log(quizHeading)
    try {
        // Find the user document by email
        const user = await userInfo.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Get the level object based on the provided level (level1, level2, etc.)
        const levelObject = user[level];

        if (!levelObject) {
            return res.status(404).json({ error: "Level not found" });
        }

        // Update the score for the provided quizHeading
        if (levelObject.hasOwnProperty(quizHeading)) {
            // If the score is greater than the existing score, update it
            if (score > levelObject[quizHeading]) {
                levelObject[quizHeading] = score;
            }
        }

        // Calculate the sum of scores in the level
        const sumOfScores = Object.values(levelObject).reduce((acc, curr) => acc + curr, 0);

        // Check if the sum of scores is greater than 26, and update complete accordingly
        if (sumOfScores > 16) {
            user[level].complete = true;
        }

        // Save the updated user information
        await user.save();

        return res.status(200).json({ message: "Score updated successfully" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = updateScore;
