const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    level1: {
        RightToEquality: { type: Number, default: 0 },
        Rightagainstdiscrimination: { type: Number, default: 0 },
        complete: { type: Boolean, default: false }
    },
    level2: {
        RightToEducation: { type: Number, default: 0 },
        RightToFreedomOfSpeechAndExpresstion: { type: Number, default: 0 },
        complete: { type: Boolean, default: false }
    },
    level3: {
        RightAgainstChildLabor: { type: Number, default: 0 },
        RightToIdentity: { type: Number, default: 0 },
        complete: { type: Boolean, default: false }
    },
    level4: {
        RightToBeProtectedFromTrafficking: { type: Number, default: 0 },
        RightToLifeAndPersonalLiberty: { type: Number, default: 0 },
        complete: { type: Boolean, default: false }
    },
    level5: {
        RightToBeProtectedAgainstAbuse: { type: Number, default: 0 },
        ProhibitionOfChildMarriages: { type: Number, default: 0 },
        complete: { type: Boolean, default: false }
    },

});

const userInfo = mongoose.model("users", userDetailsSchema);

module.exports = userInfo;
