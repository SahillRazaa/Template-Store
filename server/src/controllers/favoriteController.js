const { Users, Templates, Favorites } = require('../../models');
const asyncHandler =require('../utils/asyncHandler');

const addFavorite = asyncHandler(async (req, res, next) => {
  const { templateId } = req.params;
  const userId = req.user.id; 

  const template = await Templates.findByPk(templateId);
  if (!template) {
    return res.status(404).json({ success: false, message: 'Template not found' });
  }

  const existingFavorite = await Favorites.findOne({
    where: {
      userId,
      templateId,
    },
  });

  if (existingFavorite) {
    return res.status(409).json({ success: false, message: 'Template already in favorites' });
  }

  await Favorites.create({
    userId,
    templateId,
  });

  res.status(201).json({ success: true, message: 'Template added to favorites' });
});


const getFavorites = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const user = await Users.findByPk(userId, {
    include: {
      model: Templates,
      as: 'favoritedTemplates',
      through: {
        attributes: [],
      },
    },
  });

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({
    success: true,
    count: user.favoritedTemplates.length,
    data: user.favoritedTemplates,
  });
});

const removeFavorite = asyncHandler(async (req, res, next) => {
  const { templateId } = req.params;
  const userId = req.user.id;

  const favorite = await Favorites.findOne({
    where: {
      userId,
      templateId,
    },
  });

  if (!favorite) {
    return res.status(404).json({ success: false, message: 'Favorite entry not found' });
  }

  await favorite.destroy();

  res.status(200).json({ success: true, message: 'Template removed from favorites' });
});

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite
};