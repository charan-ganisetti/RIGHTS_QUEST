const express = require('express');
const login = require("../controllers/Login");
const updatescore = require("../controllers/updatescore");
const levelstatus = require('../controllers/levelStatus');
const statusMarks = require("../controllers/statusMarks");

const router = express.Router();

router.post("/login", login);
router.patch("/updatescore", updatescore);
router.get("/status", levelstatus);
router.get("/statusMarks", statusMarks);

module.exports = router;