const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact(req, res, next) {
  const { name, email, message, subject } = req.body || {};
  const errors = {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  } else if (name.trim().length > 80) {
    errors.name = 'Name cannot exceed 80 characters.';
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  } else if (message.trim().length > 2000) {
    errors.message = 'Message cannot exceed 2,000 characters.';
  }

  if (subject && typeof subject === 'string' && subject.trim().length > 120) {
    errors.subject = 'Subject cannot exceed 120 characters.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please check your form input.',
      errors
    });
  }

  // Sanitized body
  req.sanitizedBody = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
    subject: subject ? subject.trim() : 'General Inquiry'
  };

  next();
}

function validateNewsletter(req, res, next) {
  const { email } = req.body || {};

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
      errors: { email: 'Invalid email format.' }
    });
  }

  req.sanitizedEmail = email.trim().toLowerCase();
  next();
}

module.exports = {
  validateContact,
  validateNewsletter
};
