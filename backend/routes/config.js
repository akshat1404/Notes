const express = require('express');
const { config } = require('../controllers/config');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.get('/', config);

module.exports = router;