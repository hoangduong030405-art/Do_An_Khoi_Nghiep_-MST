const axios = require('axios');
async function test() {
  try {
    const email = 'test.persist.' + Date.now() + '@huego.vn';
    const res = await axios.post('http://localhost:3000/api/v1/auth/register', { email, password: 'Password123!', fullName: 'User Persist' });
    const token = res.data.accessToken;
    const { Pool } = require('pg');
    const pool = new Pool({ connectionString: 'postgres://postgres:huego_secure_password_2026@localhost:5432/huego_db' });
    const placeRes = await pool.query(`SELECT id, "qrToken", latitude, longitude FROM places WHERE name LIKE '%Thiên Mụ%' LIMIT 1`);
    const place = placeRes.rows[0];
    pool.end();

    const headers = { Authorization: 'Bearer ' + token };
    const unlockRes = await axios.post('http://localhost:3000/api/v1/geofencing/unlock', {
      latitude: place.latitude + 0.0001,
      longitude: place.longitude,
      qrToken: place.qrToken
    }, { headers });
    console.log('Unlock status:', unlockRes.status, unlockRes.data);
    
    // Save token to file
    require('fs').writeFileSync('persist_token.txt', token);
    console.log('Token saved to persist_token.txt');
  } catch(e) {
    console.log(e.message);
  }
}
test();
