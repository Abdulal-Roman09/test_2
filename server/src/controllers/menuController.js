const path = require('path');
const fs = require('fs').promises;

const MENU_FILE = path.join(__dirname, '../data/menu.json');

async function getMenu(req, res, next) {
  try {
    const rawData = await fs.readFile(MENU_FILE, 'utf-8');
    let menu = JSON.parse(rawData);

    const { category, dietary, featured } = req.query;

    if (category) {
      menu = menu.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (dietary) {
      const requestedTags = dietary.split(',').map(tag => tag.trim().toLowerCase());
      menu = menu.filter(item => 
        requestedTags.every(reqTag => 
          item.dietary && item.dietary.some(itemTag => itemTag.toLowerCase() === reqTag)
        )
      );
    }

    if (featured === 'true') {
      menu = menu.filter(item => item.featured === true);
    }

    // Extract unique categories and dietary tags for UI metadata convenience
    const allRaw = JSON.parse(rawData);
    const categories = Array.from(new Set(allRaw.map(item => item.category)));
    const dietaryTags = Array.from(new Set(allRaw.flatMap(item => item.dietary || [])));

    res.status(200).json({
      success: true,
      count: menu.length,
      categories,
      dietaryTags,
      data: menu
    });
  } catch (error) {
    next(error);
  }
}

async function getMenuItemById(req, res, next) {
  try {
    const rawData = await fs.readFile(MENU_FILE, 'utf-8');
    const menu = JSON.parse(rawData);
    const item = menu.find(m => m.id === req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Menu item with ID '${req.params.id}' was not found.`
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMenu,
  getMenuItemById
};
