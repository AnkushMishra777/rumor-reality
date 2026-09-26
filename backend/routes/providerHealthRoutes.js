const express = require("express");
const { getProviderHealth } = require("../services/providerHealthService");

const router = express.Router();

router.get("/", (req, res) => {
    return res.json({
        success: true,
        providers: getProviderHealth()
    });
});

module.exports = router;
