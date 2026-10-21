const { Client } = require('pg');

async function seedGas() {
  const dbName = process.env.DATABASE_NAME || 'huego_db_lock_demo';
  const client = new Client({
    connectionString: `postgres://postgres:huego_secure_password_2026@localhost:5432/${dbName}`,
  });
  await client.connect();

  await client.query(`
    INSERT INTO places (id, name, slug, "categoryCode", "categoryName", "descriptionVi", "descriptionEn", address, latitude, longitude, "geofenceRadiusMeters", "environmentType", "ticketPriceVnd", "greenRewardPoints", "thumbnailUrl", "qrToken")
    VALUES 
    ('cay-xang-hung-vuong', 'Cây Xăng Petrolimex Số 2 Hùng Vương', 'cay-xang-petrolimex-hung-vuong', 'GAS_STATION', 'Tiện ích: Cây Xăng', 'Trạm xăng trung tâm ngã 6 Hùng Vương.', 'Central gas station.', 'Số 02 Hùng Vương, TP Huế', 16.4615, 107.5921, 35, 'OUTDOOR', 0, 0, 'https://images.unsplash.com/photo-1545459720-aac8509eb02c', 'qr-token-gas-2'),
    ('cay-xang-nguyen-hue', 'Cây Xăng Petrolimex Số 5 Nguyễn Huệ', 'cay-xang-petrolimex-nguyen-hue', 'GAS_STATION', 'Tiện ích: Cây Xăng', 'Trạm cấp nhiên liệu đường Nguyễn Huệ.', 'Gas station on Nguyen Hue.', 'Số 45 Nguyễn Huệ, TP Huế', 16.4589, 107.5842, 35, 'OUTDOOR', 0, 0, 'https://images.unsplash.com/photo-1545459720-aac8509eb02c', 'qr-token-gas-3')
    ON CONFLICT (id) DO NOTHING;
  `);

  const res = await client.query(`SELECT id, name, "categoryCode", "greenRewardPoints" FROM places WHERE "categoryCode" = 'GAS_STATION' OR "greenRewardPoints" = 0`);
  console.log('Cây xăng 0 điểm trong CSDL:', res.rows);

  await client.end();
}

seedGas().catch(console.error);
