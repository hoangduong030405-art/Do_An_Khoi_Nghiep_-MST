import { MigrationInterface, QueryRunner } from "typeorm";

export class CompleteSchemaEntities1791270000000 implements MigrationInterface {
    name = 'CompleteSchemaEntities1791270000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Tạo bảng certificates nếu chưa có
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "certificates" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "code" character varying(100) NOT NULL,
                "userId" character varying NOT NULL,
                "recipientName" character varying(100) NOT NULL,
                "title" character varying(200) NOT NULL,
                "unlockedCount" integer NOT NULL DEFAULT 0,
                "greenPoints" integer NOT NULL DEFAULT 0,
                "hmacSignature" character varying(255) NOT NULL,
                "issuedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_certificates_code" UNIQUE ("code"),
                CONSTRAINT "PK_certificates_id" PRIMARY KEY ("id")
            )
        `);

        // 2. Tạo bảng unlock_audit_logs nếu chưa có
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "unlock_audit_logs" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userId" character varying,
                "placeId" character varying,
                "reason" character varying(50) NOT NULL,
                "message" text NOT NULL,
                "latitude" double precision,
                "longitude" double precision,
                "accuracy" double precision,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_unlock_audit_logs_id" PRIMARY KEY ("id")
            )
        `);

        // 3. Bổ sung các cột thiếu cho crowdsource_submissions
        await queryRunner.query(`
            ALTER TABLE "crowdsource_submissions" 
            ADD COLUMN IF NOT EXISTS "imageUrl" character varying,
            ADD COLUMN IF NOT EXISTS "environmentType" character varying,
            ADD COLUMN IF NOT EXISTS "pointsAwarded" integer
        `);

        // 4. Xử lý dòng NULL và đảm bảo NOT NULL cho user_unlocks.userId và user_unlocks.placeId
        await queryRunner.query(`DELETE FROM "user_unlocks" WHERE "userId" IS NULL OR "placeId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_unlocks" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_unlocks" ALTER COLUMN "placeId" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "unlock_audit_logs"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "certificates"`);
        await queryRunner.query(`ALTER TABLE "crowdsource_submissions" DROP COLUMN IF EXISTS "pointsAwarded"`);
        await queryRunner.query(`ALTER TABLE "crowdsource_submissions" DROP COLUMN IF EXISTS "environmentType"`);
        await queryRunner.query(`ALTER TABLE "crowdsource_submissions" DROP COLUMN IF EXISTS "imageUrl"`);
    }
}
