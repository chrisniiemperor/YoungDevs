const express = require('express');
const { submitApplication } = require('../controllers/applicationController');
const router = express.Router();

router.post('/apply', submitApplication);

module.exports = router;