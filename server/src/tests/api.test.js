const http = require('http');
const assert = require('assert');
const app = require('../index');

async function runTests() {
  console.log('🧪 Starting Ember & Bloom Backend API Automated Tests...\n');
  
  // Start server on ephemeral port
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  ✓ ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ ${name}`);
      console.error(`    Error: ${err.message}`);
      failed++;
    }
  }

  try {
    // 1. Health check
    await test('GET /api/health returns 200 and status ok', async () => {
      const res = await fetch(`${baseUrl}/api/health`);
      assert.strictEqual(res.status, 200);
      const json = await res.json();
      assert.strictEqual(json.status, 'ok');
    });

    // 2. Menu retrieval
    await test('GET /api/menu returns 200, category lists, and menu items', async () => {
      const res = await fetch(`${baseUrl}/api/menu`);
      assert.strictEqual(res.status, 200);
      const json = await res.json();
      assert.strictEqual(json.success, true);
      assert.ok(Array.isArray(json.data), 'data should be an array');
      assert.ok(json.data.length > 0, 'menu should not be empty');
      assert.ok(Array.isArray(json.categories), 'categories should be present');
      assert.ok(json.data[0].name, 'item should have name');
      assert.ok(json.data[0].price, 'item should have price');
    });

    // 3. Menu filtering
    await test('GET /api/menu?category=Espresso%20%26%20Classics returns filtered items', async () => {
      const res = await fetch(`${baseUrl}/api/menu?category=Espresso%20%26%20Classics`);
      assert.strictEqual(res.status, 200);
      const json = await res.json();
      assert.strictEqual(json.success, true);
      assert.ok(json.data.length > 0);
      json.data.forEach(item => {
        assert.strictEqual(item.category, 'Espresso & Classics');
      });
    });

    // 4. Contact validation failure
    await test('POST /api/contact rejects invalid or missing fields with 400', async () => {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'A', email: 'invalid-email', message: 'Hi' })
      });
      assert.strictEqual(res.status, 400);
      const json = await res.json();
      assert.strictEqual(json.success, false);
      assert.ok(json.errors.name, 'should flag short name');
      assert.ok(json.errors.email, 'should flag invalid email');
      assert.ok(json.errors.message, 'should flag short message');
    });

    // 5. Contact valid submission
    await test('POST /api/contact saves valid submission with 201', async () => {
      const payload = {
        name: 'Jane Regular',
        email: 'jane.coffee@example.com',
        subject: 'Table Reservation for Roasting Workshop',
        message: 'Hello! I would love to inquire about bringing a party of 4 to your Saturday cupping session.'
      };
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      assert.strictEqual(res.status, 201);
      const json = await res.json();
      assert.strictEqual(json.success, true);
      assert.ok(json.data.id, 'should generate submission ID');
    });

    // 6. Newsletter signup
    await test('POST /api/newsletter accepts valid email with 201', async () => {
      const testEmail = `tester-${Date.now()}@artisancoffee.org`;
      const res = await fetch(`${baseUrl}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail })
      });
      assert.strictEqual(res.status, 201);
      const json = await res.json();
      assert.strictEqual(json.success, true);
      assert.strictEqual(json.alreadySubscribed, false);
    });

    // 7. Newsletter duplicate check
    await test('POST /api/newsletter handles duplicate email gracefully with 200', async () => {
      const testEmail = 'duplicate.subscriber@artisancoffee.org';
      // First signup
      await fetch(`${baseUrl}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail })
      });
      // Second signup
      const res = await fetch(`${baseUrl}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail })
      });
      assert.strictEqual(res.status, 200);
      const json = await res.json();
      assert.strictEqual(json.alreadySubscribed, true);
    });

  } finally {
    server.close();
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
