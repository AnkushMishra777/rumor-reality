const express = require("express");

const {
    getHistoryController
} = require("../controllers/historyController");

const router = express.Router();

router.get("/", getHistoryController);

module.exports = router;