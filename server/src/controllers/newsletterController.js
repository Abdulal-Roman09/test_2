const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');

const NEWSLETTER_FILE = path.join(__dirname, '../data/newsletter.json');

async function handleNewsletterSignup(req, res, next) {
  try {
    const email = req.sanitizedEmail;

    let subscribers = [];
    try {
      const rawData = await fs.readFile(NEWSLETTER_FILE, 'utf-8');
      subscribers = JSON.parse(rawData);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    const alreadySubscribed = subscribers.some(
      sub => sub.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadySubscribed) {
      return res.status(200).json({
        success: true,
        alreadySubscribed: true,
        message: 'Welcome back! You are already subscribed to our roastery gazette.'
      });
    }

    const newSubscriber = {
      id: crypto.randomUUID ? crypto.randomUUID() : `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      email,
      subscribedAt: new Date().toISOString()
    };

    subscribers.push(newSubscriber);

    const tempFile = `${NEWSLETTER_FILE}.tmp`;
    await fs.writeFile(tempFile, JSON.stringify(subscribers, null, 2), 'utf-8');
    await fs.rename(tempFile, NEWSLETTER_FILE);

    console.log(`[NEWSLETTER SIGNUP] New subscriber: ${email}`);

    res.status(201).json({
      success: true,
      alreadySubscribed: false,
      message: 'Welcome to the Ember & Bloom circle! Expect seasonal harvest notes and brewing guides in your inbox.'
    });
  } catch (error) {
    next(error);
  }
}

async function getNewsletterSubscribers(req, res, next) {
  try {
    let subscribers = [];
    try {
      const rawData = await fs.readFile(NEWSLETTER_FILE, 'utf-8');
      subscribers = JSON.parse(rawData);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleNewsletterSignup,
  getNewsletterSubscribers
};
