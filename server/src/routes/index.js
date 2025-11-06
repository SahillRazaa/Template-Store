const express = require('express');
const authRoutes = require('./authRoutes');
const templateRoutes = require('./templateRoutes');
const favoriteRoutes = require('./favoriteRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/templates', templateRoutes);
router.use('/favorites', favoriteRoutes);

module.exports = router;