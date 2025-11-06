const { Template } = require('../../models');
const { Op } = require('sequelize'); 
const asyncHandler = require('../utils/asyncHandler');

const getAllTemplates = asyncHandler(async (req, res, next) => {
  const { category, search } = req.query;
  
  let where = {};

  if (category) {
    where.category = category;
  }

  if (search) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } }, 
      { description: { [Op.iLike]: `%${search}%` } }
    ];
  }

  const templates = await Template.findAll({
    where,
    order: [['createdAt', 'DESC']] 
  });

  res.status(200).json({
    success: true,
    count: templates.length,
    data: templates,
  });
});


const getTemplateById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const template = await Template.findByPk(id); 

  if (!template) {
    return res.status(404).json({ success: false, message: 'Template not found' });
  }

  res.status(200).json({
    success: true,
    data: template,
  });
});

module.exports = {
  getAllTemplates,
  getTemplateById,
};