# HUEGO – PHASE 3: XÁC THỰC & PHÂN QUYỀN (BACKEND ONLY)

## 0. BỐI CẢNH BẮT BUỘC ĐỌC TRƯỚC

Trước khi viết một dòng code, đọc `UPGRADE_PROMPT.md` và báo cáo lại những điều sau
bằng output thật. Nếu bất kỳ điều nào không khớp thì DỪNG và báo cáo, đừng tự sửa
giả định:

```
docker ps                                          # phai thay huego-postgis "Up"
docker exec huego-postgis psql -U postgres -d huego_db -c "\dt"
docker exec huego-postgis psql -U postgres -d huego_db -c "SELECT COUNT(*) FROM places;"
docker exec huego-postgis psql -U postgres -d huego_db -c "\d users"
cd backend && npx tsc --noEmit -p tsconfig.json   # phai exit 0
```

### Ground truth đã xác minh (commit `3b2f061`)

Container `huego-postgis` đang chạy PostgreSQL 16.4 + PostGIS 3.4.3, database
`huego_db`, port 5432. Schema đã được gộp còn **một** file seed duy nhất tại
`backend/database/seeds/01_init_postgis_and_seed.sql`. File `02_huego_full_schema.sql`
đã bị xoá vì trước đó nó định nghĩa trùng bảng `users`/`place_categories` với schema
khác file 01, khiến `CREATE TABLE IF NOT EXISTS` thành no-op và script vỡ ở câu
`INSERT` thiếu cột `display_order`.

| Bảng | Số bản ghi |
|---|---|
| `places` | **26** |
| `place_categories` | **9** |
| `users` | **1** (demo) |
| `badges` | 3 |
| `itineraries` | 1 |
| `itinerary_items` | 3 |

Tổng cộng 14 bảng, gồm `itineraries`, `itinerary_items`, `reviews`, `certificates`.

Phân bố `places` theo `categoryCode` (phải khớp chính xác):

```
HISTORICAL 5 · CUISINE 6 · OUTSKIRTS_ECO 4 · SCENIC_VIEW 3 · CAFE 3
VEHICLE_RENTAL 2 · GAS_STATION 1 · CULTURE_ART 1 · CRAFT_VILLAGE 1
```

Cột `places` đã có: `tags`, `best_time_to_visit`, `rating_avg`, `review_count`,
`gallery_images`, `is_wheel_eligible`, `updated_at`.

Cột `users` đã có: `password_hash VARCHAR(255)`, `password_changed_at`, `role`
(CHECK trong `TOURIST`/`LOCAL_CONTRIBUTOR`/`ADMIN`), `green_points`, `current_level`,
`preferences`, `is_active`.

Demo user đã seed (băm bcryptjs cost 10, đã verify khớp):

```
id:               e7b0e774-7243-41bb-9be4-8a4b868e82ef
email:            tourist.demo@huego.vn
password:         Huego@2026
green_points:     125
current_level:    2
role:             TOURIST
```

`bcrypt.compareSync('Huego@2026', hash)` → `true`, sai mật khẩu → `false`.

### Điều CẤM tuyệt đối

- **KHÔNG** sửa `backend/database/seeds/*.sql`. Schema đã đúng và đã commit. Đây là
  dữ liệu nền đã nghiệm thu.
- **KHÔNG** chạy `docker compose down -v`, `docker volume rm`, hay bất kỳ lệnh nào
  xoá volume. Mất dữ liệu là không thể hoàn tác.
- **KHÔNG** sửa `docker-compose.yml` trong phase này.
- **KHÔNG** đụng vào thư mục `mobile/`. Phase 3 là **backend only**.
- **KHÔNG** dùng `// ignore` hay `// ignore_for_file`. Xoá import cũ hơn là bịt lỗi.
- **KHÔNG** dùng `bcrypt` native (cần build toolchain C++ trên Windows). Dùng
  `bcryptjs` đã cài sẵn.
- **KHÔNG** commit, KHÔNG push. Chỉ sửa file và báo cáo.
- **KHÔNG** hardcode secret. `JWT_SECRET` đã có trong `backend/.env` (gitignore rồi).
- **KHÔNG** được làm app Flutter hỏng. Xem Mục 1.5.

---

## 1. MỤC TIÊU

Xây dựng hệ thống xác thực JWT trên backend, dùng PostgreSQL qua TypeORM.

Hoàn thành phase này thì `curl` phải đăng ký được, đăng nhập được, và gọi được
endpoint có bảo vệ bằng token — **không cần Flutter**.

### Phân quyền theo `role`

| Role | Quyền |
|---|---|
| `TOURIST` | Đọc/ghi dữ liệu cá nhân của chính mình |
| `LOCAL_CONTRIBUTOR` | Như `TOURIST` + được gửi crowdsource submission |
| `ADMIN` | Đọc/ghi dữ liệu của mọi người, duyệt crowdsource |

Đừng thiết kế `@Roles()` decorator quá sớm nếu chưa có endpoint nào cần nó. Nhưng
`role` phải nằm trong JWT payload và `/auth/me` phải trả về nó.

---

## 2. BƯỚC 2.1 — NỐI TYPORM (chưa từng được nối)

Đây là phần quan trọng nhất và **hiện tại chưa tồn tại**: `@nestjs/typeorm`, `pg`,
`typeorm` đã nằm trong `package.json` nhưng `app.module.ts` **không hề có**
`TypeOrmModule.forRoot`. Chưa có DataSource, chưa có entity, chưa có
`synchronize`. Phải xây mới hoàn toàn.

### 2.1.1 Cấu hình

Tạo `backend/src/database/typeorm.config.ts` dùng `ConfigService` đọc từ `.env`:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=huego_secure_password_2026
DATABASE_NAME=huego_db
```

Toàn bộ 6 biến này đã tồn tại trong `backend/.env`. Phải đọc từ env, không hardcode.
Nếu thiếu biến thì fail sớm với thông báo tiếng Việt rõ ràng, không phải crash kiểu
`undefined is not an object`.

### 2.1.2 Quyết định bắt buộc về `synchronize`

Schema đã được seed SQL quản lý, và đã commit. Đặt `synchronize: true` sẽ khiến
TypeORM **tự ý sửa bảng**, kể cả xoá cột không có trong entity. Đây là rủi ro mất
dữ liệu thật.

Bắt buộc:

```ts
synchronize: false
```

Sửa lại những gì lệch so với mốc ban đầu:

- **KHÔNG** viết `NODE_ENV === 'development' ? false : false`. Đó là biểu thức vô
  nghĩa rút gọn từ `? true : false` rồi bịa thêm nhánh giả. Cứ viết thẳng `false`
  kèm comment giải thích vì sao không được bật.

Nếu bạn thấy cần `synchronize: true` để cho schema chạy, đó là dấu hiệu entity
đang sai — dừng lại và báo cáo, đừng bật cờ.

`migration` thì chưa cần tạo trong phase này.

### 2.1.3 Entity `User`

Tạo `backend/src/modules/auth/entities/user.entity.ts`. Chỉ map **những cột đang
tồn tại** trong DB. Bảng có 13 cột, nhưng entity chỉ cần các cột phase này dùng;
cột không map vẫn an toàn khi `synchronize: false`.

Bắt buộc có:

| Trường entity | Cột DB | Ghi chú |
|---|---|---|
| `id` | `uuid` | `@PrimaryColumn('uuid')` — DB đã có default, **không** dùng `@PrimaryGeneratedColumn('uuid')` |
| `email` | `varchar(255)` | `@Column({ unique: true })` |
| `passwordHash` | `varchar(255)` | `@Column({ nullable: true, select: false })` |
| `fullName` | `varchar(100)` | map `full_name` |
| `role` | `varchar(20)` | `@Column({ default: 'TOURIST' })` |
| `greenPoints` | `int` | map `green_points`, `@Column({ default: 0 })` |
| `currentLevel` | `int` | map `current_level` |
| `isActive` | `boolean` | map `is_active` |
| `passwordChangedAt` | `timestamptz` | map `password_changed_at`, nullable |
| `createdAt` | `timestamptz` | map `created_at` |
| `updatedAt` | `timestamptz` | map `updated_at` |

**Quan trọng — `select: false` trên `passwordHash`:** cột này phải không bao giờ được
SELECT mặc định, kể cả trong log. Khi cần hash để so khớp thì dùng
`createQueryBuilder().addSelect('user.passwordHash')`. Đây là hàng rào quan trọng,
đừng bỏ qua.

`role` dùng enum TypeScript:

```ts
export enum UserRole {
  TOURIST = 'TOURIST',
  LOCAL_CONTRIBUTOR = 'LOCAL_CONTRIBUTOR',
  ADMIN = 'ADMIN',
}
```

Giá trị phải khớp CHECK constraint trong DB. Thêm enum mà quên cập nhật CHECK
constraint sẽ gây lỗi runtime — hãy đối chiếu với `\d users`.

### 2.1.4 Module

`TypeOrmModule.forRootAsync` trong `app.module.ts` với `inject: [ConfigService]`,
`type: 'postgres'`, `entities: [User]`, `synchronize: false`,
`retryAttempts: 5`, `retryDelay: 3000`.

Đăng ký `TypeOrmModule.forFeature([User])` trong `AuthModule`.

Sau khi nối xong, chứng minh TypeORM thực sự chạy:

```
docker exec huego-postgis psql -U postgres -d huego_db -c "SELECT count(*) FROM pg_stat_activity WHERE datname='huego_db';"
```

Số kết nối phải tăng so với trước khi bật app. Hoặc log từ app khi khởi động phải
không có `ECONNREFUSED`.

---

## 3. BƯỚC 3.2 — CÀI DEPENDENCY

```bash
cd backend
npm install @nestjs/jwt@^10.2.0 @nestjs/passport@^10.0.3 passport@^0.7.0 passport-jwt@^4.0.1
```

`bcryptjs@^2.4.3` đã cài sẵn ở commit `3b2f061`, không cài lại.

Không dùng `@nestjs/config` lần nữa ở đây — đã có sẵn và `isGlobal: true`.

### 3.2.1 `JwtModule`

Khai báo trong `AuthModule`:

```ts
JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    secret: config.getOrThrow<string>('JWT_SECRET'),
    signOptions: { expiresIn: '7d' },
  }),
})
```

Dùng `getOrThrow` để thiếu `JWT_SECRET` thì báo lỗi rõ ràng ngay lúc khởi động, thay
vì để `secret` là `undefined` và mọi token sau này đều không xác thực được.

`JWT_SECRET` đã có trong `backend/.env`. **Không** commit giá trị này. Không đặt
fallback kiểu `secret: 'huego-secret'` — sẽ lộ trong git.

---

## 4. BƯỚC 3.3 — MODULE AUTH

Cấu trúc:

```
backend/src/modules/auth/
├── auth.module.ts
├── auth.controller.ts
├── auth.service.ts
├── dto/
│   ├── register.dto.ts
│   ├── login.dto.ts
│   └── ...
├── entities/
│   └── user.entity.ts
├── strategies/
│   └── jwt.strategy.ts
└── guards/
    ├── jwt-auth.guard.ts
    └── roles.guard.ts
```

### Guard mặc định đóng + decorator `@Public()`

Đây là thiết kế quan trọng. Mặc định **mọi** endpoint là private:

```ts
providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }]
```

Trong `JwtAuthGuard`, kiểm tra metadata `@Public()` trước:

```ts
const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
  context.getHandler(),
  context.getClass(),
]);
if (isPublic) return true;
```

Lý do: nếu để mặc định là public, thì mọi endpoint thêm sau này cũng public trừ khi
ai đó nhớ thêm guard. Với mặc định đóng, thêm endpoint mới là an toàn ngay. Đây là
lý do an toàn theo mặc định — đừng đảo ngược.

### 1.5 TUYỆT ĐỐI PHẢI LÀM: mở `@Public()` cho các endpoint sẵn có

**Đây là bước dễ sót nhất của toàn bộ phase, và đã từng làm hỏng app trong lần chạy
trước.**

Bật `APP_GUARD` toàn cục sẽ chặn **tất cả** endpoint đã tồn tại từ Phase 1, kể cả
những endpoint không liên quan đến auth. Nếu không đánh dấu `@Public()`, app Flutter
sẽ hỏng hoàn toàn: không tải được bản đồ, không có điểm Xanh, không có thời tiết.

Trước khi kết thúc phase, **bắt buộc** chạy lệnh này và liệt kê kết quả:

```bash
cd backend
# 1. Liệt kê MỌI controller
Get-ChildItem -Recurse -Filter *.controller.ts src
# 2. Tìm endpoint nào CHƯA có @Public()
Get-ChildItem -Recurse -Filter *.ts src | Select-String -Pattern "@(Get|Post|Put|Patch|Delete)\(" |
  Where-Object { (Get-Content $_.Path)[$_.LineNumber-2] -notmatch "@Public" }
```

### Quyết định chế độ khách: XEM TRƯỚC ĐƯỢC, ĐĂNG NHẬP SAU

Đã chốt với người dùng. App Flutter **không** bắt buộc đăng nhập để xem bản đồ,
thời tiết, điểm Xanh hay vòng quay. Người dùng xem trước, đăng nhập sau.

Vì vậy các endpoint app gọi phải mang `@Public()`:

| Endpoint | Controller | Lý do |
|---|---|---|
| `GET /api/v1/places` | `places.controller.ts` | Bản đồ, khách chưa login phải xem được |
| `GET /api/v1/places/nearby` | `places.controller.ts` | Radar GIS |
| `GET /api/v1/weather/hue-current` | `weather.controller.ts` | Dữ liệu công khai |
| `GET /api/v1/gamification/profile/:userId` | `gamification.controller.ts` | Xem điểm |
| `POST /api/v1/gamification/certificate/:userId` | `gamification.controller.ts` | Xem chứng nhận |
| `GET /random-wheel/filters`, `/spin` | `random-wheel.controller.ts` | Vòng quay |
| `POST /api/v1/ai-guide/chat` | `ai-assistant.controller.ts` | Trợ lý AI |
| `POST /api/v1/geofencing/*` | `geofencing.controller.ts` | Check-in GPS |
| `GET /health`, `GET /app`, `GET /admin` | `app.controller.ts` | Probe + trang demo |

Với mỗi endpoint mở `@Public()` vì lý do trên, hãy để lại comment
`// TODO(phase4): phải bắt buộc token và so sánh userId trong token với :userId`.
Phase sau mới xử lý. Ghi rõ trong báo cáo đây là **nợ bảo mật tạm thời**, không phải
quyết định vĩnh viễn — hiện tại bất kỳ ai cũng đọc được hồ sơ của user khác theo id.

`GET /app` và `GET /admin` là hai trang demo HTML tĩnh phục vụ kiểm thử Phase 1,
đóng thì không ai xem được. Cũng mở `@Public()`.

### `JwtStrategy`

```ts
super({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
})
```

Trong `validate(payload)`:
- `payload.sub` là user id dạng UUID
- Tra `User` từ DB bằng `id`
- **Nếu user không tồn tại hoặc `isActive === false`, ném `UnauthorizedException`**
- Trả về `{ id, email, role }`

Phải tra DB mỗi request, không chỉ tin payload. Nếu không, token của user bị xoá
vẫn dùng được tới khi hết hạn 7 ngày.

### CORS

`main.ts` hiện dùng `origin: '*'` kèm `credentials: true`. Tổ hợp này sai và trình
duyệt sẽ chặn. Nhưng phase này **chưa dùng cookie** (dùng Bearer token trong header),
nên để nguyên vẫn chạy được. Ghi chú lại, sửa khi làm Flutter web.

---

## 5. BƯỚC 3.4 — API CONTRACT

Tất cả dưới prefix `/api/v1` (xem `main.ts` để xác nhận).

### `POST /api/v1/auth/register` — `@Public()`

Body, không có field nào khác:

```json
{
  "email": "khach.moi@huego.vn",
  "password": "MatKhau@2026",
  "fullName": "Nguyễn Văn A",
  "phoneNumber": "0912345678"
}
```

Trả `201`:

```json
{
  "accessToken": "<jwt>",
  "tokenType": "Bearer",
  "expiresIn": 604800,
  "user": {
    "id": "<uuid>",
    "email": "khach.moi@huego.vn",
    "fullName": "Nguyễn Văn A",
    "role": "TOURIST",
    "greenPoints": 0,
    "currentLevel": 1
  }
}
```

Response **không được** chứa `passwordHash`. Không có trường này trong bất kỳ DTO
response nào.

### `POST /api/v1/auth/login` — `@Public()`

```json
{ "email": "tourist.demo@huego.vn", "password": "Huego@2026" }
```

Trả `200` với cùng cấu trúc `accessToken` / `tokenType` / `expiresIn` / `user`.

### `GET /api/v1/auth/me`

Yêu cầu header:

```
Authorization: Bearer <accessToken>
```

Trả `200` với đúng object `user` như trên.

### Validate bằng `class-validator`

`main.ts` đã bật `ValidationPipe` với `whitelist: true, forbidNonWhitelisted: true`.
Nghĩa là gửi field lạ sẽ bị `400`. Đây là chủ ý — hãy test để chứng minh.

DTO:

- `email`: `@IsEmail()`, `@MaxLength(255)`
- `password`: `@IsString()`, `@MinLength(8)`, `@MaxLength(72)`
  - 72 là giới hạn của bcrypt — cắt bớt ký tự là dấu hiệu passcode dài sai thiết kế
- `fullName`: `@IsString()`, `@MinLength(2)`, `@MaxLength(100)`
- `phoneNumber`: optional, `@Matches(/^0\d{9}$/)`

### Mã lỗi

Dùng tiếng Việt, không để lộ chi tiết nội bộ:

| Tình huống | HTTP | Nội dung |
|---|---|---|
| Email trùng | 409 | `Email đã được sử dụng` |
| Sai mật khẩu / email không tồn tại | 401 | `Email hoặc mật khẩu không đúng` |
| Không có token | 401 | `Cần đăng nhập để truy cập` |
| Token hết hạn / sai chữ ký | 401 | `Phiên đăng nhập không hợp lệ` |
| Field thừa trong body | 400 | message từ `ValidationPipe` |

Email sai và mật khẩu sai phải trả **cùng một thông báo**. Phân biệt hai trường hợp
đó giúp kẻ tấn công dò email tồn tại. Đừng viết "Không tìm thấy user".

---

## 6. BƯỚC 3.5 — BẢO MẬT

### Hash mật khẩu

```ts
async hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}
async verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
```

Cost 12 cho tài khoản thật. Seed dùng cost 10 vì chạy một lần lúc khởi tạo — đó là
chấp nhận được.

### So khớp mật khẩu chống timing attack

`bcrypt.compare` tự xử lý. Không tự so sánh chuỗi thủ công.

### Login: so khớp hash giả khi user không tồn tại

Nếu email không có trong DB, hãy chạy `bcrypt.compare` với một hash giả cố định
rồi mới trả `401`. Thiếu bước này, thời gian phản hồi làm lộ email nào tồn tại.

### Normalize email

`email.trim().toLowerCase()` trước khi query và trước khi insert. Nếu không,
`Anh@Huego.vn` và `anh@huego.vn` sẽ là hai tài khoản khác nhau dù DB có UNIQUE —
vì UNIQUE của Postgres phân biệt hoa thường.

### Token

- Bearer trong header, **không** dùng cookie. Đơn giản hơn và tránh CSRF.
- `expiresIn: '7d'`.
- Không refresh token trong phase này. Khi nào cần thì làm sau.
- Không log token ra console, kể cả khi debug.

### Rate limit

Không cài `throttler` trong phase này. Ghi rõ giới hạn này trong báo cáo — đăng nhập
không giới hạn số lần thử là rủi ro đoán mật khẩu, cần xử lý ở phase sau.

### Nợ bảo mật tạm thời do chế độ khách

Vì app Flutter chưa có màn hình đăng nhập, nhiều endpoint đang ở `@Public()`:

- `/api/v1/gamification/profile/:userId` và `/certificate/:userId`: bất kỳ ai cũng
  xem được hồ sơ của user khác nếu biết id.
- `/api/v1/geofencing/*`: cộng điểm Green Points lấy `userId` từ body, chưa gắn với
  token.
- `/api/v1/ai-guide/chat`: tốn Gemini API key, chưa giới hạn theo user.

Phải nêu đầy đủ ba nợ này trong báo cáo, kèm mục tiêu `TODO(phase4)`. Đây là quyết
định tạm thời để app không hỏng, **không phải** thiết kế vĩnh viễn. Khi làm Flutter,
`userId` phải lấy từ token thay vì từ body hoặc từ URL.

---

## 7. BƯỚC 3.6 — CHỨNG MINH BẰNG `curl`

Chạy backend, rồi paste **output thật** của tất cả lệnh dưới. Không tự tưởng tượng
kết quả.

```bash
cd backend && npm run start:dev
```

Mở terminal khác:

```bash
# 1. Register – 201, KHONG duoc chua passwordHash trong response
curl -i -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"khach.moi@huego.vn","password":"MatKhau@2026","fullName":"Nguyễn Văn A","phoneNumber":"0912345678"}'

# 2. Register trung email – 409
# 3. Register thieu field – 400
# 4. Register gui field thua – 400
# 5. Login sai mat khau – 401, thong bao PHAI giong het case 1

# 6. Login demo – 200, lay accessToken
curl -i -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"tourist.demo@huego.vn","password":"Huego@2026"}'

# 7. /me KHONG co token – 401
# 8. /me token sai – 401
# 9. /me token hop le – 200, user.email = tourist.demo@huego.vn

# 10. Hash co thuc su luu trong DB, va bcrypt.compare khop
docker exec huego-postgis psql -U postgres -d huego_db \
  -c "SELECT email, left(password_hash,7), length(password_hash) FROM users;"
```

### Bắt buộc chứng minh `select: false` hoạt động

`select: false` chỉ có tác dụng ở **tầng TypeScript**, nên SQL thuần **không** chứng
minh được. Đừng dùng các biểu thức hằng số như
`position('password_hash' in 'password_hash')` — kết quả luôn là `1` và vô nghĩa.

Cách chứng minh đúng: viết script TypeScript dùng `DataSource` thật, so sánh
`findOne()` thường với query có `addSelect`.

```ts
import { DataSource } from 'typeorm';
import { User } from './src/modules/auth/entities/user.entity';

const ds = new DataSource({
  type: 'postgres', host: 'localhost', port: 5432,
  username: 'postgres', password: process.env.DATABASE_PASSWORD,
  database: 'huego_db', entities: [User], synchronize: false,
});
await ds.initialize();

const a = await ds.getRepository(User).findOne({ where: { email: 'x@huego.vn' } });
console.log('findOne() mac dinh ->', a?.passwordHash === undefined ? 'undefined' : 'CO HASH');

const b = await ds.getRepository(User).createQueryBuilder('user')
  .addSelect('user.passwordHash').where('user.email = :e', { e: 'x@huego.vn' }).getOne();
console.log('addSelect()        ->', b?.passwordHash ? 'CO HASH' : 'undefined');
```

Kết quả **bắt buộc** phải là:

```
findOne() mac dinh -> undefined
addSelect()        -> CO HASH
```

Đọc mật khẩu `.env` cho `process.env.DATABASE_PASSWORD` (file đã gitignore).
Chạy bằng `npx ts-node -T --project tsconfig.json <file>.ts`. **Xoá file script tạm
sau khi chạy xong**, không để lại trong repo.

Và xác nhận không endpoint nào trả `passwordHash` trong body.

### Không chạm vào dữ liệu demo

`green_points` của demo user là **125** và đó là giá trị mà UI Flutter hiện đang hiển
thị. Tuyệt đối không sửa nó trong lúc test.

---

## 8. TIÊU CHÍ NGHIỆM THU

Mọi mục phải PASS, có output thật làm bằng chứng:

- [ ] `npx tsc --noEmit` exit 0, không lỗi
- [ ] `places` vẫn đúng **26** bản ghi sau khi bật app
- [ ] `place_categories` vẫn đúng **9**
- [ ] Demo user vẫn `green_points = 125`, `role = TOURIST`
- [ ] Không sửa file seed SQL
- [ ] `synchronize: false` — không đổi schema
- [ ] Register 201, login 200, `/me` 200
- [ ] 401 khi thiếu token / sai token / sai mật khẩu
- [ ] 409 khi email trùng
- [ ] 400 khi thiếu field hoặc gửi field thừa
- [ ] Response không bao giờ chứa `passwordHash`
- [ ] Mật khẩu lưu dạng bcrypt `$2a$`, không phải plaintext
- [ ] Email sai và mật khẩu sai cho cùng một thông báo 401
- [ ] Email được lowercase trước khi query
- [ ] `JWT_SECRET` đọc từ `.env`, không hardcode, không commit
- [ ] Không có `// ignore`
- [ ] Không sửa file nào trong `mobile/`
- [ ] Không commit, không push

### Kiểm tra thêm, bắt buộc

**App không được hỏng.** Sau khi bật `APP_GUARD`, chạy và dán output:

```bash
# Tất cả phải trả 200 khi KHÔNG gửi token
curl.exe -s -o NUL -w "%{http_code}\n" http://localhost:3000/api/v1/places
curl.exe -s -o NUL -w "%{http_code}\n" http://localhost:3000/api/v1/weather/hue-current
curl.exe -s -o NUL -w "%{http_code}\n" http://localhost:3000/random-wheel/filters
curl.exe -s -o NUL -w "%{http_code}\n" http://localhost:3000/health
```

Đồng thời xác nhận dữ liệu không đổi:

```bash
curl.exe -s http://localhost:3000/api/v1/places
# phai tra ve 26 dia danh, 9 danh muc khop ground truth
curl.exe -s http://localhost:3000/api/v1/gamification/profile/e7b0e774-7243-41bb-9be4-8a4b868e82ef
# phai tra greenPoints = 125, currentLevel = 2, totalSystemPlaces = 26
docker exec huego-postgis psql -U postgres -d huego_db \
  -c "SELECT email, green_points, role FROM users ORDER BY created_at;"
```

Cho thấy user demo vẫn nguyên và user mới đăng ký có `green_points = 0`.

---

## 9. PHẠM VI GIAO DIỆN — ĐỂ PHASE SAU

Phase này **không** làm gì trong `mobile/`. Ghi chú lại những việc này để phase sau làm:

- Nơi lưu access token trên Flutter. `flutter_secure_storage` là lựa chọn, nhưng
  **trên web nó dùng IndexedDB và cần cấu hình thêm**. Đây là lý do phase này
  chỉ làm backend và test bằng `curl`.
- Nối token vào `ApiClient` (interceptor đã sẵn có sẵn).
- Màn hình đăng nhập/đăng ký.
- Xử lý `401` → chuyển hướng về màn hình đăng nhập.
- `flutter_secure_storage` trên web có rủi ro bảo mật khác `mobile`. Cần ghi rõ
  vào báo cáo, không giấu nhẹ.

---

## 10. CÁCH BÁO CÁO

Báo cáo bằng tiếng Việt, kèm output thật của mọi lệnh đã chạy. Cần có:

1. Danh sách file đã tạo/sửa
2. Output `tsc --noEmit`
3. Output `curl` của **tất cả** 10 case ở mục 7
4. Kết quả `\d users` và câu query đối chiếu `places`/`place_categories`
5. Xác nhận `synchronize: false` và cách đọc `JWT_SECRET`
6. Xác nhận `passwordHash` không lộ ra, kèm bằng chứng
7. Danh sách rủi ro còn lại (nêu rõ rate limit chưa có, chưa có refresh token,
   CORS chưa sửa)
8. Những gì **không** làm và lý do

Nếu bất kỳ tiêu chí nào ở mục 8 không đạt, nói thẳng là chưa đạt và giải thích vì sao.
Không được báo cáo hoàn thành khi chưa thực sự đạt. Nếu gặp blocker, dừng lại báo
lại thay vì tự tưởng tượng cách sửa.

Ghi nhớ: **dừng lại sau phase này, không tự làm tiếp phần Flutter.**