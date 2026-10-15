

const axios = require('axios');
const crypto = require('crypto');

async function testIntegration() {
  try {
    const email = `test.concurrent.${Date.now()}@huego.vn`;
    console.log(`1. Registering ${email}...`);
    let res = await axios.post('http://localhost:3000/api/v1/auth/register', {
      email,
      password: 'Password123!',
      fullName: 'Test Concurrent User'
    });
    
    console.log(`2. Logging in...`);
    res = await axios.post('http://localhost:3000/api/v1/auth/login', {
      email,
      password: 'Password123!'
    });
    const token = res.data.accessToken;
    const userId = res.data.user.id;
    console.log('Token received');

    // Get a place from DB
    const { Pool } = require('pg');
    const pool = new Pool({ connectionString: 'postgres://postgres:huego_secure_password_2026@localhost:5432/huego_db' });
    const placeRes = await pool.query(`SELECT id, "qrToken", latitude, longitude FROM places WHERE name LIKE '%Thiên Mụ%' LIMIT 1`);
    const place = placeRes.rows[0];
    pool.end();

    const headers = { Authorization: `Bearer ${token}` };

    console.log(`3. Sending 10 concurrent requests to unlock...`);
    const reqs = [];
    for(let i=0; i<10; i++) {
      reqs.push(
        axios.post('http://localhost:3000/api/v1/geofencing/unlock', {
          latitude: place.latitude + 0.0001,
          longitude: place.longitude,
          qrToken: place.qrToken
        }, { headers }).catch(e => e.response)
      );
    }
    
    const responses = await Promise.all(reqs);
    let successCount = 0;
    let failCount = 0;
    for(const r of responses) {
      if (r.data && r.data.unlocked) successCount++;
      else failCount++;
    }
    
    console.log(`Results: ${successCount} unlocked, ${failCount} failed (expected 1 unlocked, 9 failed)`);
    
    // Check points
    const myProfile = await axios.get('http://localhost:3000/api/v1/auth/me', { headers });
    res = await axios.get(`http://localhost:3000/api/v1/gamification/profile/${myProfile.data.id}`, { headers });
    console.log('Total Points:', res.data.user.greenPoints);

  } catch(e) {
    console.error('Test failed:', e.response?.data || e.message);
  }
}

testIntegration();
