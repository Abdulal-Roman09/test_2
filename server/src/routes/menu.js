const express = require('express');
const router = express.Router();
const { getMenu, getMenuItemById } = require('../controllers/menuController');

// GET /api/menu - Retrieve full or filtered menu
router.get('/', getMenu);

// GET /api/menu/:id - Retrieve specific item
router.get('/:id', getMenuItemById);

module.exports = router;
