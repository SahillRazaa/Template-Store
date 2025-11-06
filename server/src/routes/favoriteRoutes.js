const express = require('express');
const { addFavorite, getFavorites } = require('../controllers/favoriteController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getFavorites);

router.route('/:templateId')
  .post(addFavorite);

module.exports = router;