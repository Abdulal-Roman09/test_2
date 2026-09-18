const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');

const CONTACTS_FILE = path.join(__dirname, '../data/contacts.json');

async function handleContactSubmission(req, res, next) {
  try {
    const { name, email, message, subject } = req.sanitizedBody;

    let contacts = [];
    try {
      const rawData = await fs.readFile(CONTACTS_FILE, 'utf-8');
      contacts = JSON.parse(rawData);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    const newContact = {
      id: crypto.randomUUID ? crypto.randomUUID() : `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      status: 'unread'
    };

    contacts.push(newContact);

    // Atomic write to prevent partial/corrupt files
    const tempFile = `${CONTACTS_FILE}.tmp`;
    await fs.writeFile(tempFile, JSON.stringify(contacts, null, 2), 'utf-8');
    await fs.rename(tempFile, CONTACTS_FILE);

    console.log(`[CONTACT RECEIVED] From: ${name} <${email}> | Subject: ${subject}`);

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! We have received your note and will get back to you within 24 hours.',
      data: {
        id: newContact.id,
        name: newContact.name,
        submittedAt: newContact.submittedAt
      }
    });
  } catch (error) {
    next(error);
  }
}

async function getContactSubmissions(req, res, next) {
  try {
    let contacts = [];
    try {
      const rawData = await fs.readFile(CONTACTS_FILE, 'utf-8');
      contacts = JSON.parse(rawData);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleContactSubmission,
  getContactSubmissions
};
