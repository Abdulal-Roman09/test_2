const express = require('express');
const router = express.Router();
const { handleNewsletterSignup, getNewsletterSubscribers } = require('../controllers/newsletterController');
const { validateNewsletter } = require('../middleware/validator');

// POST /api/newsletter - Join the subscriber newsletter
router.post('/', validateNewsletter, handleNewsletterSignup);

// GET /api/newsletter - List subscribers (administrative reference)
router.get('/', getNewsletterSubscribers);

module.exports = router;
