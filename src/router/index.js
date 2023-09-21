const express = require("express");
const router = express.Router();
const { handleResponse } = require('../utils/handlResponse')
const { test, webhook } = require('./user')

router.get("/abc", async (req, res) => handleResponse(res, await test(req.query)));
router.post("/webhook", async (req, res) => handleResponse(res, await webhook(req.body)));

module.exports = router;