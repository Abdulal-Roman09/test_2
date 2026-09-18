const express = require('express');
const router = express.Router();
const { handleContactSubmission, getContactSubmissions } = require('../controllers/contactController');
const { validateContact } = require('../middleware/validator');

// POST /api/contact - Submit contact form with validation
router.post('/', validateContact, handleContactSubmission);

// GET /api/contact - List submitted contacts (for administrative reference)
router.get('/', getContactSubmissions);

module.exports = router;
