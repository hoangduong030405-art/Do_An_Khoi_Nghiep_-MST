import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1791217136640 implements MigrationInterface {
    name = 'InitialMigration1791217136640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password_hash" character varying(255), "phone_number" character varying(20), "full_name" character varying(100) NOT NULL, "avatar_url" text, "role" character varying(20) NOT NULL DEFAULT 'TOURIST', "green_points" integer NOT NULL DEFAULT '0', "current_level" integer NOT NULL DEFAULT '1', "is_active" boolean NOT NULL DEFAULT true, "password_changed_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "places" ("id" character varying NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "categoryCode" character varying NOT NULL, "categoryName" character varying NOT NULL, "descriptionVi" text NOT NULL, "descriptionEn" text NOT NULL, "address" character varying NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "geofenceRadiusMeters" integer NOT NULL, "environmentType" character varying NOT NULL, "ticketPriceVnd" integer NOT NULL, "greenRewardPoints" integer NOT NULL, "thumbnailUrl" character varying NOT NULL, "qrToken" character varying, CONSTRAINT "PK_1afab86e226b4c3bc9a74465c12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_points" ("userId" uuid NOT NULL, "points" integer NOT NULL DEFAULT '0', "lastLatitude" double precision, "lastLongitude" double precision, "lastCheckAt" TIMESTAMP, CONSTRAINT "PK_36ced61a62c66d2844032bdbf40" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "user_unlocks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "placeId" character varying NOT NULL, "unlockedAt" TIMESTAMP NOT NULL DEFAULT now(), "distanceMeters" double precision NOT NULL, "pointsAwarded" integer NOT NULL, CONSTRAINT "UQ_8a7a7595e77779459b7fa7fb3ac" UNIQUE ("userId", "placeId"), CONSTRAINT "PK_6d1549d755cab385952135b069f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "crowdsource_submissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "description" text NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "status" character varying NOT NULL DEFAULT 'PENDING', "submittedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_60434e1e364dedb5b51d176ce9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "token_hash" character varying(64) NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "revoked_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_a7838d2ba25be1342091b6695f1" UNIQUE ("token_hash"), CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3ddc983c5f7bcf132fd8732c3f" ON "refresh_tokens" ("user_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a7838d2ba25be1342091b6695f" ON "refresh_tokens" ("token_hash") `);
        await queryRunner.query(`CREATE TABLE "coupons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "partnerName" character varying NOT NULL, "discountValue" integer NOT NULL, "costGreenPoints" integer NOT NULL DEFAULT '0', "usedCount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_d7ea8864a0150183770f3e9a8cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`DROP TABLE "coupons"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a7838d2ba25be1342091b6695f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3ddc983c5f7bcf132fd8732c3f"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "crowdsource_submissions"`);
        await queryRunner.query(`DROP TABLE "user_unlocks"`);
        await queryRunner.query(`DROP TABLE "user_points"`);
        await queryRunner.query(`DROP TABLE "places"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
