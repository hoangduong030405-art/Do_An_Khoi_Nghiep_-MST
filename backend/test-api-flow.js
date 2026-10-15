const axios = require('axios');
const crypto = require('crypto');

async function testApi() {
  try {
    const email = `test.${Date.now()}@huego.vn`;
    console.log(`1. Registering ${email}...`);
    let res = await axios.post('http://localhost:3000/api/v1/auth/register', {
      email,
      password: 'Password123!',
      fullName: 'Test User'
    });
    console.log('Register status:', res.status);

    console.log(`2. Logging in...`);
    res = await axios.post('http://localhost:3000/api/v1/auth/login', {
      email,
      password: 'Password123!'
    });
    const token = res.data.accessToken;
    console.log('Login status:', res.status, 'Token received');

    // Chùa Thiên Mụ: latitude: 16.4529, longitude: 107.5451, greenRewardPoints: 50, qrToken: ...
    // Query DB for qrToken
    const { Pool } = require('pg');
    const pool = new Pool({ connectionString: 'postgres://postgres:huego_secure_password_2026@localhost:5432/huego_db' });
    const placeRes = await pool.query(`SELECT id, "qrToken", latitude, longitude FROM places WHERE name LIKE '%Thiên Mụ%' LIMIT 1`);
    const place = placeRes.rows[0];
    const placeId = place.id;
    const qrToken = place.qrToken;
    const lat = place.latitude;
    const lng = place.longitude;
    pool.end();

    const headers = { Authorization: `Bearer ${token}` };

    console.log(`3. Unlocking at 35m... (Should succeed and award 50 pts)`);
    // Haversine ~35m: +0.0003 lat
    try {
      res = await axios.post('http://localhost:3000/api/v1/geofencing/unlock', {
        latitude: lat + 0.0003,
        longitude: lng,
        qrToken
      }, { headers });
      console.log('Unlock 1 status:', res.status, res.data);
    } catch(e) { console.log('Unlock 1 Error:', e.response?.data || e.message); }

    console.log(`4. Unlocking again... (Should fail/already unlocked)`);
    try {
      res = await axios.post('http://localhost:3000/api/v1/geofencing/unlock', {
        latitude: lat,
        longitude: lng,
        qrToken
      }, { headers });
      console.log('Unlock 2 status:', res.status, res.data);
    } catch(e) { console.log('Unlock 2 Error:', e.response?.data || e.message); }

    console.log(`5. Unlocking too far...`);
    try {
      res = await axios.post('http://localhost:3000/api/v1/geofencing/unlock', {
        latitude: lat + 0.005, // We are too far
        longitude: lng,
      }, { headers });
      console.log('Unlock 3 status:', res.status, res.data);
    } catch(e) { console.log('Unlock 3 Error (expected):', e.response?.status, e.response?.data?.message || e.message); }

    console.log(`6. Check total points...`);
    const myProfile = await axios.get('http://localhost:3000/api/v1/auth/me', { headers });
    res = await axios.get(`http://localhost:3000/api/v1/gamification/profile/${myProfile.data.id}`, { headers });
    console.log('Total Points:', res.data.points, 'Level:', res.data.currentLevel);

  } catch(e) {
    console.error('Test failed:', e.response?.data || e.message);
  }
}

testApi();
