const express = require('express');
const router = express.Router();
const { getMenu, getMenuItemById, getMenuItemBySlug } = require('../controllers/menuController');

// GET /api/menu - Retrieve full or filtered menu
router.get('/', getMenu);

// GET /api/menu/slug/:slug - Retrieve specific item by slug
router.get('/slug/:slug', getMenuItemBySlug);

// GET /api/menu/:id - Retrieve specific item by ID
router.get('/:id', getMenuItemById);

module.exports = router;
