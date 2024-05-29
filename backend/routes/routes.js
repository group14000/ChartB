const express = require('express');
const router = express.Router();
const Energy = require('../models/models');

// GET all energy data
router.get('/data', async (req, res) => {
  try {
    const data = await Energy.find({});
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
